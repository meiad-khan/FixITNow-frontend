import { getProfile } from "@/service/getProfile"
import { TechnicianProfileForm } from "../../_components/profile/TechnicianProfileForm"

const TechnicianProfilePage = async () => {

  const technician = await getProfile()
  console.log("Technician profile is ", technician.data);

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div>
        <p className="text-sm font-medium text-violet-600">My Profile</p>
        <h1 className="font-serif text-3xl font-bold tracking-tight">
          Profile Settings
        </h1>
        <p className="mt-1 text-muted-foreground">
          Keep your info and availability up to date so customers can find you.
        </p>
      </div>

      <TechnicianProfileForm profile={technician.data} />
    </div>
  )
}

export default TechnicianProfilePage
