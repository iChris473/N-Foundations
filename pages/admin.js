import CustomizedTables from "../components/CustomizedTables";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";


export default function Admin() {
 

  return (
    <div>
      <Topbar />
      <div className="my-40 max-w-[1000px] mx-2 lg:mx-auto">
        <CustomizedTables />
      </div>
      <Footer />
    </div>
  )
}
