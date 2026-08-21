import { getAllUsers } from "@/app/(dashboardGroup)/_actions/adminDashboard"
import TableBody from "./TableBody"

type Props = {
  query: {
    [key: string]: string | string[] | undefined
  }
}

export default async function UsersTableContent({ query }: Props) {
  const usersResponse = await getAllUsers({ query })

  const users = usersResponse.data.data ?? []

  return <TableBody users={users} />
}
