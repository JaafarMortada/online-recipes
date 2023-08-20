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
          <span className='sidebar-username'>Username</span>
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
          <SubMenu icon={<FaListUl/>} label="My Shopping Lists" >
            <MenuItem icon={<PiCheckFatFill/>}> List 1 </MenuItem>
            <MenuItem icon={<PiCheckFatFill/>}> List 2 </MenuItem>
            <MenuItem icon={<PiCheckFatFill/>}> List 3 </MenuItem>
          </SubMenu>
          <MenuItem icon={<FaCalendarAlt/>}> Calendar </MenuItem>
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