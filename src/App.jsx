import { useState ,useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import PersonList from "./components/PersonList";
import AddForm from "./components/AddForm";
import "./App.css";
function App() {

  const [data, setData] = useState([]);
  const [theme,setTheme] = useState(localStorage.getItem("mode") || "light")

  const deleteUser = async (id) =>{
    if(id) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/register/delete${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          alert("ลบข้อมูลสำเร็จ");
          fetchData();
        }
      } catch (err) {
        console.error("Error deleting subject:", err);
      }
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/register", {
        headers: {
          "Content-Type": "application/json",
        },
      });
        if(response.status === 403){
            alert("ไม่มีสข้อมูล")
        } else if(response.status === 200){
          setData(response.data);
        }
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  // ✅ เรียกตอน mount ครั้งแรก
  useEffect(() => {
    fetchData();
  }, [setData]);

  useEffect(()=>{
    localStorage.setItem("mode",theme)
  },[theme])

  return (
    <div className={theme}>
    <div className="App">
      <Header title="My CRUD" theme={theme} setTheme={setTheme}/>
      <main>
        <AddForm data={data} setData={setData}/>
        <PersonList data={data} deleteUser={deleteUser}/>
      </main>
    </div>
    </div>
  );
}

export default App;
