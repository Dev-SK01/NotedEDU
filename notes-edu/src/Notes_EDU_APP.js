import React, { useRef, useState } from 'react'
import { ListItem } from './List_Item';
import './App.css'
import { Footer } from './Footer';

const ParsedLocalList = JSON.parse(localStorage.getItem('ListData'));
/*           Reset and completion count functionality  */
const hours = new Date().getHours();
console.log(hours);
if (hours == 11) {

    const ModifiedList = ParsedLocalList.map((item) => {
        if (item.checked == false) {
            item.UnDone = item.UnDone + 1;
        } else {
            item.Done = item.Done + 1;
        }
        item.checked = false;
        console.log(item);
        return item

    })
    localStorage.setItem('ListData', JSON.stringify(ModifiedList));
}


// -------------------------------------------------------

function Notes_EDU_APP() {


    const backToInput = useRef()
    // list and keys Use State
    const [itemobj, setItem] = useState(ParsedLocalList || [])

    function handlechange(id) {
        const list_item = itemobj.map((item) => (
            item.id === id ? { ...item, checked: !item.checked } : item))

        setItem(list_item);
        // storing the to the local storage when the task completed
        localStorage.setItem('ListData', JSON.stringify(list_item))
    }

    function handleDelete(id) {
        const list_item = itemobj.filter((item) => (
            item.id != id
        ))

        setItem(list_item);
        // storing the to the local storage when the task deleted
        localStorage.setItem('ListData', JSON.stringify(list_item))
    }
    // -----------------------------------------------

    //  Creating Add List component
    const AddListElement = () => {

        const [listItem, setListItem] = useState('');

        function setInputData(inputListData) {
            const id = itemobj.length ? itemobj[itemobj.length - 1].id + 1 : 1;
            const NewListData = { id, checked: false, data: inputListData, Done: 0, UnDone: 0 };
            const addListData = [...itemobj, NewListData];
            // ListData.push(NewListData);
            setItem(addListData);
            localStorage.setItem('ListData', JSON.stringify(addListData));
        }

        function handleListSubmit(e) {
            e.preventDefault();
            // adding the list to the ListData Object
            setInputData(listItem)
            // clearing the input after list added
            setListItem('');
        }
        // ------------------------------- Components -_-____________-
        return (
            <>
                <form className='List-form' onSubmit={handleListSubmit}>
                    {/* Input Field to get the list */}
                    <input
                        type="text"
                        id='list-input'
                        ref={backToInput}
                        placeholder='Enter Your List To Add'
                        required
                        value={listItem}
                        onChange={(e) => (setListItem(e.target.value))}
                        className='input'
                    />
                    <button
                        type='submit'
                        className='add-btn'
                        onChange={() => (backToInput.current.focus())}
                    >
                        <i className="bi bi-check2-circle"></i>
                    </button>
                </form>

                <div className="welcome-div">
                    {/* celebration div */}
                    <div className="celebration" id='celebration'
                        style={((itemobj.map((item) => (item.checked))) ?
                            { display: "block" } :
                            { display: "none" })}
                    >

                    </div>
                    <div className="welcome-text">
                        <p>Hello👋</p>
                    </div>
                    <div className="welcome-icon">
                        <p>Buddy,</p>
                    </div>
                    <div className="welcome-img">
                    </div>
                </div>


            </>

        )


    }


    // Controlled Input Component
    return (
        <>
            {/* AddList Component */}
            <AddListElement />
            <section className='Content'>

                {/* <ExampleUSeState /> */}
                <ListItem
                    ItemObj={itemobj}
                    handleDelete={handleDelete}
                    handlechange={handlechange}

                />

            </section>


            <Footer
                react=" You Have "
                length={itemobj.length}
            />

        </>
    )

}





export { Notes_EDU_APP };
