import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import TextInput from '../textInput/Index';
import MyButton from '../button';
import "./styles.css"
import Avatar from '../../assets/avatar';
import Logo from '../../assets/logo';
import { FaListUl } from 'react-icons/fa';
import { BsCalendarCheck, BsCalendarDay } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import { VscSearch } from 'react-icons/vsc';
import { BsCalendarPlus } from 'react-icons/bs';
import { MdOutlineAdd } from 'react-icons/md';
import { AiOutlineHome } from 'react-icons/ai';
import { useNavigate,useLocation } from "react-router-dom";
import { useState, useCallback } from 'react';
import RecipeModal from '../modal';
import { sendRequest } from '../../config/request';
import { useSearchContext } from '../../global/context';
import { useShoppingListState } from "../../global/browseOrList";

const MySideBar = () => {

  const navigate = useNavigate()
  const [modalChoice, setModalChoice] = useState("")
  const { search, updateSearch } = useSearchContext()
  const { shoppingListIsShown, setShoppingListIsShown } = useShoppingListState();

  let location = useLocation();
  
  const [data, setData] = useState({
    search_for: "",
  })

  const [searchBy, setSearchBy] = useState('')

  const handleDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const searchHandler = () => {
    updateSearch(`${searchBy}/${data.search_for}`)
    if (location.pathname !== 'home'){
      navigate("/home")
    }
    setShoppingListIsShown(false)
  }

  const cancelSearch = () => {
    updateSearch('')
    setData({ search_for: "" })
    setSearchBy('')
  }

  const openModalToAddEvent = () => {
    setModalChoice("addCalenderEvent")
    setIsModalOpen(true)
  }

  const openModalToAddRecipe = () => {
    setModalChoice("addRecipe")
    setIsModalOpen(true)
  }

  const viewCalender = () => {
    setShoppingListIsShown(false)
    cancelSearch()
    navigate("/calender")
  }

  const backHome = () => {
    navigate("/home")
    setShoppingListIsShown(false)
  }

  const toggleShoppingList = () => {
    if (location.pathname !== 'home'){
      navigate("/home")
    }
    setShoppingListIsShown(true)
  }

  const logoutHandler = async () => {
    try {
      const response = await sendRequest({
        method: "POST",
        route: "/api/logout",
      });
      if (response.message === "Successfully logged out") {
        localStorage.clear()
        navigate('/')
      }
    } catch (error) {
      console.log(error);
    }
  }

  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = useCallback(() => {
    setIsModalOpen(prevValue => !prevValue);
  }, []);

  return (
    <>
      <RecipeModal isOpen={isModalOpen} toggleModal={toggleModal} from={modalChoice} />
      <Sidebar>
        <div>
          <div className='sidebar-user-profile'>
            <div className='sidebar-user-icon-div'>
              <Avatar width={'60'} height={'60'} />
            </div>
            <span className='sidebar-username'>{localStorage.getItem('name')}</span>
          </div>
          <Menu >
            <MenuItem icon={<AiOutlineHome className={location.pathname === "/home" && !shoppingListIsShown ? "use-location transition" : ''} />} onClick={backHome} > Home </MenuItem>
            <SubMenu icon={<VscSearch className={ search !== '' ? "use-location transition" : ''}/>} label="Search By" >
              <MenuItem style={{ height: '140px', padding: '5px 15px 5px' }}>
                <div className='search-options'>
                  <MyButton
                    label={"name"}
                    onClick={() => setSearchBy('name')}
                    className={searchBy === 'name' ? 'highlight' : ''}
                    styles={{ width: '67px' }}
                  />
                  <MyButton
                    label={"cuisine"}
                    onClick={() => setSearchBy('cuisine')}
                    className={searchBy === 'cuisine' ? 'highlight' : ''}
                    styles={{ width: '67px' }}
                  />
                  <MyButton
                    label={"ingredient"}
                    onClick={() => setSearchBy('ingredient')}
                    className={searchBy === 'ingredient' ? 'highlight' : ''}
                    styles={{ width: '67px' }}
                  />
                </div>
                <TextInput
                  name={'search_for'}
                  type={'text'}
                  placeholder={"search a recipe"}
                  onChange={handleDataChange}
                  value={data.search_for}
                />
                <div className='search-cancel-container'>
                  <MyButton label={"cancel"} onClick={cancelSearch} styles={{ width: '67px' }} />
                  <MyButton label={"Search"} onClick={searchHandler} styles={{ width: '67px' }} />
                </div>
              </MenuItem>
            </SubMenu>
            <MenuItem icon={<MdOutlineAdd className={(modalChoice === "addRecipe" && isModalOpen) ? "use-location transition" : ''}/>} onClick={openModalToAddRecipe}> Create A Recipe </MenuItem>
            <MenuItem icon={<FaListUl className={shoppingListIsShown ? "use-location transition" : ''}/>} onClick={toggleShoppingList}> Shopping List </MenuItem>
            <SubMenu icon={<BsCalendarDay className={(location.pathname === "/calender" || (modalChoice === "addCalenderEvent" && isModalOpen)) ? "use-location transition" : ''}/>} label="Calender" >
              <MenuItem icon={<BsCalendarCheck className={location.pathname === "/calender" ? "use-location transition" : ''}/>} onClick={viewCalender} > View calender </MenuItem>
              <MenuItem icon={<BsCalendarPlus className={(modalChoice === "addCalenderEvent" && isModalOpen) ? "use-location transition" : ''} />} onClick={openModalToAddEvent}> Add an event </MenuItem>
            </SubMenu>
          </Menu>
        </div>
        <div className='sidebar-logo-container'>
          <Menu>
            <MenuItem icon={<BiLogOut />} onClick={logoutHandler}> Logout </MenuItem>
          </Menu>
          <div className='sidebar-logo-icon-div'>
            <Logo />
          </div>
          <span className='sidebar-rights'>© No copy rights</span>
        </div>
      </Sidebar>
    </>
  );
}

export default MySideBar;