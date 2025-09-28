import { useState } from "react";
import axios from "axios";
import "./AddForm.css";
export default function AddForm(){
    const [name,setName] = useState("")
    const [gender,setGender] = useState("ชาย")


    const  saveData = async (e) => {
        e.preventDefault()
        try{
            const response = await axios.post("http://localhost:3000/api/users/create", {
                firstName: name,
                lastName: name,
                username: name,
                password: "1234"
            });
            if(response.status === 201){
                console.log("สมัครสมาชิกสำเร็จ");
                window.location.reload();
            }
        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการสมัครสมาชิก:", error);
        }
    }
    return(
        <section className="container">
            <form onSubmit={saveData}>
                <label>ชื่อ</label>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
                <select value={gender} onChange={(e)=>setGender(e.target.value)}>
                    <option>ชาย</option>
                    <option>หญิง</option>
                </select>
                <button type="submit" className="btn-save" >บันทึก</button>
            </form>
        </section>
    );
}