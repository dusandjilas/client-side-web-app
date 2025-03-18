import { OrderModel } from "../models/order.model"
import { UserModel } from "../models/user.model"

export class UserService {
  static retrieveUsers(): UserModel[] {
    if (!localStorage.getItem('users')) {
      const defaultUsers: UserModel[] = [
        {
          email: 'user@example.com',
          firstName: 'Example',
          lastName: 'User',
          phone: '+3816123456789',
          address: 'Mokroluska 14, Vozdovac',
          password: 'user123',
          orders: [],
          bookedMovies: []
        }
      ]
      localStorage.setItem('users', JSON.stringify(defaultUsers))
    }
    return JSON.parse(localStorage.getItem('users')!)
  }

  static createUser(model: UserModel): boolean {
    const users = this.retrieveUsers()
    if (users.some(u => u.email === model.email)) return false
    users.push(model)
    localStorage.setItem('users', JSON.stringify(users))
    return true
  }

  static updateUser(model: UserModel): void {
    const users = this.retrieveUsers().map(user => 
      user.email === model.email ? { ...user, ...model } : user
    )
    localStorage.setItem('users', JSON.stringify(users))
  }

  static login(email: string, password: string): boolean {
    const user = this.retrieveUsers().find(u => u.email === email && u.password === password)
    if (user) {
      localStorage.setItem('active', user.email)
      return true
    }
    return false
  }

  static getActiveUser(): UserModel | null {
    let users = JSON.parse(localStorage.getItem('users') || '[]')
    const activeUser = users.find((user: UserModel) => user.email === localStorage.getItem('active'))
    return activeUser || null
  }

  static createOrder(order: OrderModel): boolean {
    const users = this.retrieveUsers()
    const activeUser = this.getActiveUser()
    if (!activeUser) return false
    
    const userIndex = users.findIndex(user => user.email === activeUser.email)
    if (userIndex === -1) return false
    
    users[userIndex].orders.push(order)
    localStorage.setItem('users', JSON.stringify(users))
    return true
  }

  static bookMovie(movie: OrderModel): boolean {
    const users = this.retrieveUsers()
    const activeUser = this.getActiveUser()
    if (!activeUser) return false
  
    const userIndex = users.findIndex(user => user.email === activeUser.email)
    if (userIndex === -1) return false
  
    if (!users[userIndex].bookedMovies) {
      users[userIndex].bookedMovies = []
    }
  
    users[userIndex].bookedMovies.push(movie)
    localStorage.setItem('users', JSON.stringify(users))
    return true
  }

  static changeOrderStatus(state: 'reserved' | 'watched' | 'canceled', id: number): boolean {
    const users = this.retrieveUsers()
    const activeUser = this.getActiveUser()
    if (!activeUser) return false

    const userIndex = users.findIndex(user => user.email === activeUser.email)
    if (userIndex === -1) return false
    
    users[userIndex].orders.forEach(order => { if (order.id === id) order.status = state })
    users[userIndex].bookedMovies.forEach(movie => { if (movie.id === id) movie.status = state })
    
    localStorage.setItem('users', JSON.stringify(users))
    return true
  }

  static changePassword(newPassword: string): boolean {
    const users = this.retrieveUsers()
    const activeUser = this.getActiveUser()
    if (!activeUser) return false
    
    const userIndex = users.findIndex(user => user.email === activeUser.email)
    if (userIndex === -1) return false
    
    users[userIndex].password = newPassword
    localStorage.setItem('users', JSON.stringify(users))
    return true
  }

  static logout(): void {
    localStorage.removeItem('active')
  }
}