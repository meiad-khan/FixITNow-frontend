import { getAllCategory } from "@/app/(publicGroup)/_actions/serviceActions/serviceActions"
import { getAllTechnician } from "@/app/(publicGroup)/_actions/technicianActions/technicianActions"
import CreateServiceForm from "./_components/CreateServiceForm"

const CreateServicePage = async () => {
  const [technicians, categories] = await Promise.all([
    getAllTechnician({}),
    getAllCategory(),
  ])

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create Service</h1>
        <p className="text-muted-foreground">
          Add a new service and assign it to a technician and category.
        </p>
      </div>

      <CreateServiceForm
        technicians={technicians?.data || []}
        categories={categories?.data || []}
      />
    </div>
  )
}

export default CreateServicePage
