import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useState } from "react";
import useCreateDate from "../components/useCreateDate";

const EditNote = ({notes,setNotes}) => {
  const {id} = useParams();
  const note = notes.find((item) => item.id===id);
  

  const [title,setTitle] = useState(note.title);
  const [details,setDetails] = useState(note.details);
  const date = useCreateDate();
  const navigate = useNavigate();

  const handleSave = (e) =>{
    e.preventDefault();
    if(title && details){
      const newNote = {...note,title,details,date};
     
      const newNotes = notes.map((item) =>{
        if(item.id === id){
          item = newNote; 
        }
        return item;
      })
      setNotes(newNotes);
    }
    navigate('/react-notes');
  }

  const handleDelete = (e) =>{

    //to confirm deletion,
    if(window.confirm("Are you sure you want to delete?")){
      e.preventDefault();
      const deletedNotes = notes.filter(item => item.id!= id);
      setNotes(deletedNotes);
      navigate('/react-notes');
    }
    
  }


  return (
    <section>
      <header className="create-note__header">
        <Link to="/" className="btn">
          <IoIosArrowBack />
        </Link>
        <button className="btn lg primary" onClick={handleSave}>
          Save
        </button>
        <button className="btn lg anger" onClick={handleDelete}>
          <RiDeleteBin6Line />
        </button>
      </header>
      <form action="" className="create-note__form" onSubmit={handleSave}>
        <input type="text"placeholder="Title" value={title} autoFocus onChange={(e)=>setTitle(e.target.value)}/>
        <textarea rows="28" value={details} onChange={(e)=>setDetails(e.target.value)}></textarea>
      </form>
    </section>
  )
}

export default EditNote;