import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import TextInput from '../textInput/Index';
import MyButton from '../button';
import "./styles.css"
import Avatar from '../../assets/avatar';
import Logo from '../../assets/logo';
import { FaListUl, FaCalendarAlt } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { VscSearch } from 'react-icons/vsc';
import { MdOutlineAdd } from 'react-icons/md';
import { HiHome } from 'react-icons/hi';
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from 'react';
import RecipeModal from '../modal';
import { sendRequest } from '../../config/request';

const MySideBar = () => {

  const navigate = useNavigate()
  const [modalChoice, setModalChoice] = useState("")

  const openModalToAddEvent = () => {
    setModalChoice("addCalenderEvent")
    setIsModalOpen(true)
  }

  const openModalToAddRecipe = () => {
    setModalChoice("addRecipe")
    setIsModalOpen(true)
  }

  const viewCalender = () => {
    navigate("/calender")
  }

  const backHome = () => {
    navigate("/home")
  }

  const logoutHandler = async () => {
    try {
        const response = await sendRequest({
            method: "POST",
            route: "/api/logout",
        });
        if(response.message === "Successfully logged out"){
            localStorage.clear()
            navigate('/')
            } 
    } catch (error) {
        console.log(error);
    }}

  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = useCallback(() => {
      setIsModalOpen(prevValue => !prevValue);
  }, []);
        
  return (
    <>
      <RecipeModal isOpen={isModalOpen} toggleModal={toggleModal} from={modalChoice}/>
      <Sidebar>
        <div>
        <div className='sidebar-user-profile'>
          <div className='sidebar-user-icon-div'>
            <Avatar width={'60'} height={'60'}/>
          </div>
          <span className='sidebar-username'>{localStorage.getItem('name')}</span>
        </div>
        <Menu >
          <MenuItem icon={<HiHome /> } onClick={backHome} > Home </MenuItem>
          <SubMenu icon={<VscSearch />} label="Search By" >
            <MenuItem style={{ height: '140px', padding: '5px 15px 5px' }}>
              <div className='search-options'>
              <MyButton label={"name"} />
              <MyButton label={"cuisine"} />
              <MyButton label={"ingredient"} />
              </div>
              <TextInput type={'text'} placeholder={"search a recipe"} />
              <MyButton label={"Search"} />
            </MenuItem>
          </SubMenu>
          <MenuItem icon={<MdOutlineAdd/>} onClick={openModalToAddRecipe}> Create A Recipe </MenuItem>
            <MenuItem icon={<FaListUl/>}> My Shopping List </MenuItem>
          <SubMenu icon={<FaCalendarAlt/>} label="Calender" >
            <MenuItem icon={<MdOutlineAdd/>} onClick={openModalToAddEvent}> Add an event </MenuItem>
            <MenuItem icon={<FaCalendarAlt/>} onClick={viewCalender}> View calender </MenuItem>
          </SubMenu>
        </Menu>
        </div>
        <div className='sidebar-logo-container'>
          <Menu>
            <MenuItem icon={<BiLogOut/>} onClick={logoutHandler}> Logout </MenuItem>
          </Menu>
        
          <div className='sidebar-logo-icon-div'>
            <Logo/>
          </div>
          <span className='sidebar-rights'>© No copy rights</span>
        </div>
      </Sidebar>
    </>
  );
}

export default MySideBar;