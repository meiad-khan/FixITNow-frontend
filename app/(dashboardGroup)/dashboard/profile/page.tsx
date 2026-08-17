import { getProfile } from "@/service/getProfile"
import ProfileForm from "../../_components/profile/ProfileForm"

export default async function ProfilePage() {
  const profile = await getProfile()

  return (
    <div className="p-4 sm:p-6">
      <ProfileForm profile={profile.data} />
    </div>
  )
}
