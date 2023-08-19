import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import TextInput from '../textInput/Index';
import MyButton from '../button';
import "./styles.css"
import Avatar from '../../assets/avatar';
import Logo from '../../assets/logo';

const MySideBar = () => {
  return (
    <>
      <Sidebar
        // rootStyles={
        //   // {height: '100vh', display:'flex', flexFlow:'column wrap'}
          
        // }
      >
        <div>
        <div className='sidebar-user-profile'>
          <div className='sidebar-user-icon-div'>
            <Avatar width={'60'} height={'60'}/>
          </div>
          <span className='sidebar-username'>Username</span>
        </div>
        <Menu >
          <SubMenu label="Search" >
            <MenuItem style={{ height: '120px', padding: '5px 15px 5px' }}>
              <div className='search-options'>
              <MyButton label={"name"} />
              <MyButton label={"cuisine"} />
              <MyButton label={"ingredient"} />
              </div>
              <TextInput type={'text'} placeholder={"search a recipe"} />
              <MyButton label={"Search"} />
            </MenuItem>
          </SubMenu>
          <SubMenu label="My Shopping Lists" >
            <MenuItem > List 1 </MenuItem>
            <MenuItem > List 2 </MenuItem>
            <MenuItem > List 3 </MenuItem>
          </SubMenu>
          <MenuItem> Calendar </MenuItem>
        </Menu>
        </div>
        <div className='sidebar-logo-container'>
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