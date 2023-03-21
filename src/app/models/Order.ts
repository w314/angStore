import OrderItem from "./OrderItem"

export default interface Order {
  items: OrderItem[]
  status: 'completed' | 'active'
}