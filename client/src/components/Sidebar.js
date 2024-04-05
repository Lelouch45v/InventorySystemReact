// Sidebar.js
import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import { faChartLine, faSignOutAlt,faUsers, faDollarSign, faWarehouse, faUserTie, faBoxOpen, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import useSidebarItems from '../Links/SideBarLinks';

const Sidebar = ({ showSidebar, onClose }) => {
  const navigate = useNavigate();

  const sidebarItems = useSidebarItems();

  const handleLogout = () => {
    alert('Logging out...');
    // Close sidebar upon logout
    onClose();
  };

  return (
    <Drawer anchor="left" open={showSidebar} onClose={onClose}>
      <div className="sidebar" style={{ width: '250px', height: '100vh', backgroundColor: '#1f2937' }}>
        <List>
          {sidebarItems.map((item, index) => (
            <ListItem button key={index} onClick={() => { item.onClick(); onClose(); }}>
              <ListItemIcon>
                <FontAwesomeIcon icon={item.icon} style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ style: { color: 'white' } }} />
            </ListItem>
          ))}
        </List>
        <Divider style={{ backgroundColor: 'grey' }} />
        <List>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <FontAwesomeIcon icon={faSignOutAlt} style={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Logout" primaryTypographyProps={{ style: { color: 'white' } }} />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;
