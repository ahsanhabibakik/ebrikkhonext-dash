declare module 'lucide-react' {
  import { ComponentType, SVGProps } from 'react'

  interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string
    color?: string
    strokeWidth?: number
  }

  type Icon = ComponentType<IconProps>

  export const Menu: Icon
  export const Search: Icon
  export const Package: Icon
  export const Users: Icon
  export const ShoppingCart: Icon
  export const Settings: Icon
  export const FileText: Icon
  export const LogOut: Icon
  export const Edit: Icon
  export const Trash2: Icon
  export const MoreVertical: Icon
  export const User: Icon
  export const DollarSign: Icon
  export const Plus: Icon
  export const X: Icon
}
