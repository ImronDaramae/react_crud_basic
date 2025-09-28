import { useState } from "react";
import axios from "axios";

import Modal from './Modal';

import boy from "../assets/boy.svg";
import girl from "../assets/girl.svg";

export default function User({item,deleteUser}) {

    const [name,setName] = useState("")
    const [gender,setGender] = useState("ชาย")

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataModal,setDataModal] = useState(null);
  
    const handleOpenModal = (item) => {
      setIsModalOpen(true);
      if(item){
        setDataModal(item);
        setName(item.username);
      }
      else{
        setDataModal(null); 
      }
    }
  
    const handleCloseModal = () => setIsModalOpen(false);

    const updatedata = async (e) => {
        e.preventDefault()
        if(dataModal){
          try{
            const response = await axios.put(`http://localhost:3000/api/register/edit/${dataModal._id}`, {
                firstName: dataModal.username,
                lastName: dataModal.username,
                username: name,
                password: "1234"
            });
            if(response.status === 200){
                console.log("แก้ไขข้อมูลสำเร็จ");
                window.location.reload();
            }
        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการแก้ไขข้อมูล:", error);
        }
        }
    }
  return (
    <>
      
        <li
          style={{
            borderStyle: "solid",
            borderColor: item.gender == "ชาย" ? "green" : "pink",
          }}
        >
          <></>
          <div style={{textAlign:"center"}} onClick={() => handleOpenModal(item)}>
            <img src={item.gender == "ชาย" ? boy : girl} width={50} height={50} />
          </div>
          <p>{item.username}</p>

          <div className="control">
            <button onClick={()=>deleteUser(item._id)}>ลบ</button>
          </div>
        </li>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {dataModal && (
          <form onSubmit={updatedata}>
              <label>ชื่อ</label>
              <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
              <select value={gender} onChange={(e)=>setGender(e.target.value)}>
                  <option>ชาย</option>
                  <option>หญิง</option>
              </select>
              <button type="submit" className="btn-save" >แก้ไข</button>
          </form>
        )}
      </Modal>
    </>
  );
}
