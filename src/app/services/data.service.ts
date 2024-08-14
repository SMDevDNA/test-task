import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Data {
  id: number;
  email: string;
  name: string;
  password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private endPoint = 'https://api.escuelajs.co/api/v1/users';
  private dataSubject = new BehaviorSubject<Data[]>([]);
  data$ = this.dataSubject.asObservable();

  constructor(private http: HttpClient) {}

  getData(): Observable<Data[]> {
    return this.http.get<Data[]>(this.endPoint).pipe(
      map(data => {
        this.dataSubject.next(data);
        return data;
      })
    );
  }

  createUser(field: Omit<Data, 'id'>): void {
    const data = this.dataSubject.value;
    const newData = { ...field, id: this.getNextId() };
    this.dataSubject.next([...data, newData]);
  }

  updateUser(field: Data): void {
    const data = this.dataSubject.value;
    const index = data.findIndex(u => u.id === field.id);
    if (index !== -1) {
      data[index] = field;
      this.dataSubject.next([...data]);
    }

  }

  deleteUser(id: number): void {
    const data = this.dataSubject.value;
    this.dataSubject.next(data.filter(field => field.id !== id))
  }

  private getNextId(): number {
    const data = this.dataSubject.value;
    return data.length > 0 ? Math.max(...data.map(field => field.id)) + 1 : 1;
  }
}
