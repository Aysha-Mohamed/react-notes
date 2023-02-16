import React, { useState,useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';
import {    BsPlusLg } from 'react-icons/bs';
import NoteItem from '../components/NoteItem';

const Notes = ({notes}) => {

  const [searchShow,setSearchShow] = useState(false);
  const showSearch = () =>{
    setSearchShow(!searchShow);
  }

  const [searchText,setSearchText] = useState('');
  const [filteredNotes,setFilteredNotes] = useState(notes);

  const handleSearch = () =>{
    // you can give e.target.value here, but the problem is, as we are calling useeffect, the function will run when the page loads,
    //so "e" will be undefined at first. Hence it causes an issue. 
    //Therefore e.target is moved to the onchange jsx.
    setFilteredNotes(notes.filter((item)=>{
      return item.title.toLowerCase().match(searchText.toLowerCase());
    }))

  }

  //if use effect is not used, when search text is inputted, 
 // the search operation will take place. But when you start deleting the search Text, the search will not take place. Hence useeffect 
 //is used 
  useEffect(handleSearch,[searchText]);

  return (
    <section>
        <header className="notes__header">
            {
              !searchShow && <h2>My Notes</h2>
            }
            {
             searchShow && <input type="text" value={searchText} onChange={(e)=>{setSearchText(e.target.value);handleSearch();}} autoFocus placeholder='Keyword...'/> 
            }
             
            <button className='btn' onClick={showSearch}>
              {searchShow ? <MdClose /> : <FaSearch />}</button>
        </header>
        <div className="notes__container">
            {
              filteredNotes.length === 0 && <p className='empty__Notes'>No Notes Found</p>
            }
            {
                filteredNotes.map((note) => <NoteItem key={note.id} note={note}/>)
            }
        </div>

        <Link className='btn add__btn' to="/create-note"><BsPlusLg /></Link>
    </section>
  )
}

export default Notes