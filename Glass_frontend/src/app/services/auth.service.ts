import { Injectable } from '@angular/core';
import { signal } from '@angular/core';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Dummy user data
  private users = signal<User[]>([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      password: 'password456',
    },
    {
      id: 3,
      firstName: 'Mike',
      lastName: 'Johnson',
      email: 'mike@example.com',
      password: 'password789',
    },
  ]);

  currentUser = signal<User | null>(null);

  login(email: string, password: string): boolean {
    const user = this.users().find((u) => u.email === email && u.password === password);
    if (user) {
      this.currentUser.set(user);
      return true;
    }
    return false;
  }

  register(firstName: string, lastName: string, email: string, password: string): boolean {
    const emailExists = this.users().some((u) => u.email === email);
    if (emailExists) {
      return false;
    }

    const newUser: User = {
      id: Math.max(...this.users().map((u) => u.id), 0) + 1,
      firstName,
      lastName,
      email,
      password,
    };

    this.users.update((users) => [...users, newUser]);
    return true;
  }

  logout(): void {
    this.currentUser.set(null);
  }

  getUsers(): User[] {
    return this.users();
  }
}
