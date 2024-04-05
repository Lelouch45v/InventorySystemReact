
import { faChartLine, faUsers, faDollarSign, faWarehouse, faBoxOpen, faShoppingCart, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation

const useSidebarItems = () => {
  const navigate = useNavigate();

  const items = [
    { text: 'Dashboard', icon: faChartLine, onClick: () => navigate('/dashboard') },
    { text: 'Users', icon: faUsers, onClick: () => navigate('/users') },
    { text: 'Manage Sales', icon: faDollarSign, onClick: () => navigate('/manage-sales') },
    { text: 'Manage Stocks', icon: faWarehouse, onClick: () => navigate('/manage-stocks') },
    { text: 'Products', icon: faBoxOpen, onClick: () => navigate('/products') },
    { text: 'Orders', icon: faShoppingCart, onClick: () => navigate('/orders') },
    { text: 'Employee', icon: faUserTie, onClick: () => navigate('/employee') },
    { text: 'Transaction', icon: faUserTie, onClick: () => navigate('/transaction') }, // Ensure URL paths are correctly cased
  ];

  return items;
};

export default useSidebarItems;
