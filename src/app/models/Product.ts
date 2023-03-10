export class Product {
  id: number
  name: string
  categoryId: number
  description: string
  price: number
  url: string

  constructor() {
    this.id = 0
    this.name = ''
    this.categoryId = 0
    this.description = ''
    this.price = 0
    this.url = ''  
  }
}