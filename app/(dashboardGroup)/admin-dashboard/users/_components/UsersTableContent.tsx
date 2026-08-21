import TableBody from "./TableBody"
import { IUser } from "@/lib/type"

type Props = {
  users: IUser[]
}

export default function UsersTableContent({ users }: Props) {
  return <TableBody users={users} />
}
