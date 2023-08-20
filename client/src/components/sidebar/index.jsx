import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import TextInput from '../textInput/Index';
import MyButton from '../button';
import "./styles.css"
import Avatar from '../../assets/avatar';
import Logo from '../../assets/logo';
import { FaListUl, FaCalendarAlt } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { VscSearch } from 'react-icons/vsc';
import { PiCheckFatFill } from 'react-icons/pi';
import { MdOutlineAdd } from 'react-icons/md';

const MySideBar = () => {
  return (
    <>
      <Sidebar>
        <div>
        <div className='sidebar-user-profile'>
          <div className='sidebar-user-icon-div'>
            <Avatar width={'60'} height={'60'}/>
          </div>
          <span className='sidebar-username'>{localStorage.getItem('name')}</span>
        </div>
        <Menu >
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
          <MenuItem icon={<MdOutlineAdd/>}> Create A Recipe </MenuItem>
            <MenuItem icon={<FaListUl/>}> My Shopping List </MenuItem>
          <SubMenu icon={<FaCalendarAlt/>} label="Calender" >
            <MenuItem icon={<MdOutlineAdd/>}> Add an event </MenuItem>
            <MenuItem icon={<FaCalendarAlt/>}> View calender </MenuItem>
          </SubMenu>
        </Menu>
        </div>
        <div className='sidebar-logo-container'>
          <Menu>
            <MenuItem icon={<BiLogOut/>}> Logout </MenuItem>
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