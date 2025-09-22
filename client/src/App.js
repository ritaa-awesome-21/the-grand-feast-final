/* global L */ // Add this line at the very top of App.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import AIAssistant from './AIAssistant';

// --- CORRECT IMPORTS ---
import 'regenerator-runtime/runtime'; // Required polyfill
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


const translations = {
  en: {
    voiceLang: 'en-US', voiceAdd: ['add'], voiceRemove: ['remove', 'delete'], voiceSearch: ['search for', 'find'],
    cartTitle: 'Your Cart', total: 'Total', clearCart: 'Clear Cart', checkout: 'Checkout', itemAdded: 'Added', itemRemoved: 'Removed', itemNotFound: 'Item not found', listening: 'Listening...', voiceUnsupported: 'Voice recognition not supported.',
    allCategories: 'All Categories', home: 'Home', reservation: 'Reservation', contactUs: 'Contact Us', signIn: 'Sign In', orderFood: 'Order from Our Menu', searchPlaceholder: 'Search...', allRightsReserved: 'All rights reserved.', privacyPolicy: 'Privacy Policy', termsOfService: 'Terms of Service', welcome: 'Welcome!', loginToYourAccount: 'Login to your account', email: 'Email', password: 'Password', login: 'Login', dontHaveAnAccount: "Don't have an account?", alreadyHaveAnAccount: "Already have an account?", registerNow: 'Register Now', logout: 'Logout', loginSuccess: 'Login successful!', loginFailed: 'Invalid credentials.', register: 'Register', registerSuccess: 'Registration successful! Please login.', registerFailed: 'Registration failed. Please try again.', noItemsFound: 'No menu items found matching your search.', addToCart: 'Add to Cart', price: 'Price', category: 'Category', welcomeToRestaurant: 'Welcome to The Grand Feast!', eatHealthy: 'Eat Healthy and Natural Food', restaurantShortDescription: 'The Grand Feast is a restaurant, bar and coffee roastery located in London. We have awesome recipes and the most talented chefs in town.', ourMenu: 'Our Menu', aboutUs: 'About Us', adminPanel: 'Admin Panel',
    reservationTitle: 'Book a Table', reservationSuccess: 'Your table has been booked!', numGuests: 'Number of Guests', date: 'Date', time: 'Time', occasion: 'Occasion (e.g., Birthday)', fullName: 'Full Name', contactNumber: 'Contact Number', bookNow: 'Book Now',
    aboutUsTitle: 'Our Culinary Journey', ourStoryTitle: 'Our Story', ourStoryDescription: 'Founded in 2010, The Grand Feast began as a small family-owned eatery with a passion for authentic flavors. Our journey has been one of dedication to quality, tradition, and the joy of sharing a good meal. We believe that food is not just sustenance, but an experience that brings people together.', ourChefsTitle: 'Our Master Chefs', ourChefsDescription: 'Our kitchen is led by a team of world-class chefs who bring a wealth of experience and creativity to every dish. Trained in the culinary capitals of the world, they masterfully blend traditional techniques with modern innovation to create a truly unforgettable dining experience.', ourIngredientsTitle: 'Fresh & Local Ingredients', ourIngredientsDescription: 'We are committed to using only the freshest, highest-quality ingredients, sourced from local farms and trusted suppliers. This commitment to quality is the cornerstone of our menu, ensuring that every bite is vibrant, flavorful, and wholesome.',
    indianAppetizersCategory: 'Indian Appetizers', chineseAppetizersCategory: 'Chinese Appetizers', biryaniAndPulaoCategory: 'Biryanis & Pulaos', curriesAndBreadsCategory: 'Curries & Breads', chineseMainCourseCategory: 'Chinese Mains', beveragesCategory: 'Beverages', dessertsCategory: 'Desserts',
    biryaniName: 'Chicken Biryani', biryaniDescription: 'Aromatic basmati rice cooked with succulent chicken and exotic spices.', paneerName: 'Paneer Butter Masala', paneerDescription: 'Creamy and rich tomato-based curry with soft paneer cubes.', paneerTikkaName: 'Paneer Tikka', paneerTikkaDescription: 'Grilled Paneer cubes marinated in spicy yogurt, served with mint chutney.', hakkaNoodlesName: 'Hakka Noodles', hakkaNoodlesDescription: 'Stir-fried noodles with a mix of fresh vegetables and savory sauces.', vegManchurianName: 'Veg Manchurian', vegManchurianDescription: 'Crispy vegetable balls tossed in a tangy and spicy Manchurian sauce.', garlicNaanName: 'Garlic Naan', garlicNaanDescription: 'Soft, fluffy Indian bread topped with fresh garlic and butter.', gulabJamunName: 'Gulab Jamun', gulabJamunDescription: 'Soft, spongy berry-sized balls soaked in a sweet, fragrant syrup.', vegFriedRiceName: 'Veg Fried Rice', vegFriedRiceDescription: 'Flavorful fried rice tossed with assorted vegetables and a blend of spices.', muttonRoganJoshName: 'Mutton Rogan Josh', muttonRoganJoshDescription: 'Aromatic lamb curry from Kashmir, cooked with a blend of spices.', mangoLassiName: 'Mango Lassi', mangoLassiDescription: 'A refreshing yogurt-based drink with sweet mango pulp.', masalaChaiName: 'Masala Chai', masalaChaiDescription: 'Traditional Indian spiced tea made with aromatic herbs.', limeSodaName: 'Fresh Lime Soda', limeSodaDescription: 'A zesty and bubbly drink made with fresh lime and soda.',
    checkoutTitle: 'Checkout', orderSummary: 'Order Summary', deliveryAddress: 'Delivery Address', address: 'Address', city: 'City', postalCode: 'Postal Code', placeOrder: 'Place Order', orderSuccessMessage: 'Order placed successfully! Thank you.',
    recommendationsTitle: "Chef's Recommendations",
    hotAndSourSoupName: 'Hot and Sour Soup',
    hotAndSourSoupDescription: 'A classic spicy and tangy soup with shredded vegetables, tofu, and mushrooms.',
    chickenManchowSoupName: 'Chicken Manchow Soup',
    chickenManchowSoupDescription: 'A popular Indo-Chinese soup with tender chicken, vegetables, and topped with crispy fried noodles.',
    samosaName: 'Samosa',
samosaDescription: 'Deep-fried pastries filled with a savory mixture of spiced potatoes, onions, and peas.',
chickenTikkaName: 'Chicken Tikka',
chickenTikkaDescription: 'Succulent boneless chicken pieces marinated in a smoky and flavorful tikka masala.',
pakoraName: 'Pakora',
pakoraDescription: 'Fritters made by dipping vegetables like potatoes or onions in a spiced gram flour batter and deep-frying until golden.',
alooTikkiName: 'Aloo Tikki',
alooTikkiDescription: 'Spiced potato patties that are shallow-fried, often served with chutneys and yogurt.',

// Biryanis
lucknowiBiryaniName: 'Lucknowi Biryani',
lucknowiBiryaniDescription: 'A subtle and aromatic biryani with tender meat, cooked in the traditional "dum pukht" style.',
kolkataBiryaniName: 'Kolkata Biryani',
kolkataBiryaniDescription: 'A unique variation that includes potatoes and boiled eggs along with the meat and rice, with milder spices.',
vegetableBiryaniName: 'Vegetable Biryani',
vegetableBiryaniDescription: 'A delightful option for vegetarians, cooked with a medley of fresh vegetables and fragrant spices.',

// Pulaos
vegetablePulaoName: 'Vegetable Pulao',
vegetablePulaoDescription: 'A simple and comforting dish made with basmati rice, mixed vegetables, and a blend of whole spices.',
kashmiriPulaoName: 'Kashmiri Pulao',
kashmiriPulaoDescription: 'A rich and mildly sweet pulao from the Kashmir Valley, garnished with a generous amount of fried nuts and fruits.',
matarPulaoName: 'Matar Pulao',
matarPulaoDescription: 'A fragrant and flavorful rice dish made with green peas and whole spices.',
tawaPulaoName: 'Tawa Pulao',
tawaPulaoDescription: 'A popular street food from Mumbai, cooked on a large griddle with vegetables and pav bhaji masala.',

// Curries
butterChickenName: 'Butter Chicken',
butterChickenDescription: 'Tender tandoori chicken pieces simmered in a creamy and tangy tomato-based gravy.',
dalMakhaniName: 'Dal Makhani',
dalMakhaniDescription: 'A creamy and flavorful lentil curry made with whole black lentils and kidney beans, slow-cooked with butter and cream.',
choleName: 'Chole (Chickpea Curry)',
choleDescription: 'A popular North Indian curry made with chickpeas cooked in a spicy and tangy onion-tomato gravy.',

// Naans
butterNaanName: 'Butter Naan',
butterNaanDescription: 'A soft and fluffy naan brushed with a generous amount of butter.',
keemaNaanName: 'Keema Naan',
keemaNaanDescription: 'A hearty naan stuffed with a savory minced meat filling.',
peshawariNaanName: 'Peshawari Naan',
peshawariNaanDescription: 'A sweet naan stuffed with a mixture of nuts, coconut, and raisins.',
plainNaanName: 'Plain Naan',
plainNaanDescription: 'The classic version, soft and perfect for scooping up delicious curries.',

// Desserts
jalebiName: 'Jalebi',
jalebiDescription: 'A crispy and chewy spiral-shaped sweet made from a fermented batter, deep-fried and soaked in sugar syrup.',
rasgullaName: 'Rasgulla',
rasgullaDescription: 'Spongy and soft cottage cheese balls boiled in a light and sweet sugar syrup.',
kheerName: 'Kheer',
kheerDescription: 'A creamy and aromatic rice pudding made with milk, rice, sugar, and flavored with cardamom and saffron.',
gajarKaHalwaName: 'Gajar ka Halwa',
gajarKaHalwaDescription: 'A rich and decadent pudding made from grated carrots, milk, sugar, and ghee.',

// Beverages
nimbuPaniName: 'Nimbu Pani',
nimbuPaniDescription: 'A refreshing and simple Indian lemonade made with fresh lemon juice, water, sugar, and a pinch of salt.',
jaljeeraName: 'Jaljeera',
jaljeeraDescription: 'A tangy and spiced Indian drink made with cumin, mint, and other spices.',
thandaiName: 'Thandai',
thandaiDescription: 'A traditional cold drink prepared with a mixture of almonds, fennel seeds, and rose petals.',

    contactUsTitle: 'Find Us', ourAddress: 'Our Address', deliveryArea: 'We deliver within a 5km radius!',
    orderConfirmationTitle: 'Thank You For Your Order!', orderConfirmationMsg: 'Your order has been placed and is being prepared.',
 
  },
  hi: {
    voiceLang: 'hi-IN', voiceAdd: ['ऐड करो', 'जोड़ें'], voiceRemove: ['डिलीट करदो', 'हटाओ'], voiceSearch: ['खोजो', 'ढूंढो'],
  },
  te: {
    voiceLang: 'te-IN', voiceAdd: ['యాడ్ చెయ్యి', 'చెయ్యి'], voiceRemove: ['తీసేయి', 'డిలీట్ చేసేయ్'], voiceSearch: ['వెతకండి', 'కనుక్కోండి'],
  },
};

const API_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// --- COMPONENTS ---
const AuthPage = ({ setPage, setIsLoggedIn, setUserName, lang, setIsAdmin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const currentTranslation = translations[lang] || translations.en;

  const handleAuth = async (e) => {
    e.preventDefault();
    setMessage('');
    const endpoint = isRegister ? 'register' : 'login';

    try {
      const response = await axios.post(`${API_URL}/auth/${endpoint}`, { email, password });

      if (isRegister) {
        setMessage(response.data.message || currentTranslation.registerSuccess);
        setIsRegister(false);
      } else {
        const { token, user } = response.data;
        localStorage.setItem('authToken', token);
        setMessage(currentTranslation.loginSuccess);
        setIsLoggedIn(true);
        setIsAdmin(user.isAdmin);
        setUserName(user.name);
        setPage(user.isAdmin ? 'admin' : 'home');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || (isRegister ? currentTranslation.registerFailed : currentTranslation.loginFailed);
      setMessage(errorMessage);
    }
  };


  return (
    <div className="auth-page-container">
      <div className="auth-form-card">
        <h2 className="auth-form-title">{isRegister ? currentTranslation.register : currentTranslation.loginToYourAccount}</h2>
        <form onSubmit={handleAuth}>
          <div className="form-group"><label htmlFor="email">{currentTranslation.email}</label><input type="email" id="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
          <div className="form-group"><label htmlFor="password">{currentTranslation.password}</label><input type="password" id="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
          {message && <p className={`auth-message ${message.includes('successful') ? 'success' : 'error'}`}>{message}</p>}
          <div className="form-actions"><button type="submit" className="primary-button full-width">{isRegister ? currentTranslation.register : currentTranslation.login}</button></div>
        </form>
        <p className="auth-switch-text">
          {isRegister ?
            (<>{currentTranslation.alreadyHaveAccount} <button onClick={() => setIsRegister(false)} className="auth-switch-button">{currentTranslation.signIn}</button></>) :
            (<>{currentTranslation.dontHaveAnAccount} <button onClick={() => setIsRegister(true)} className="auth-switch-button">{currentTranslation.registerNow}</button></>)}
        </p>
        <div className="back-to-home"><button onClick={() => setPage('home')} className="back-to-home-button">Back to Home</button></div>
      </div>
    </div>
  );
};

const AdminPage = ({ menuItems, setMenuItems, setPage, translations, lang, reservations, allCategoryKeys, orders }) => {
  // NEW: Added nutrition object to initial state
  const initialFormState = {
    id: null, nameKey: '', descriptionKey: '', price: '', categoryKey: 'curriesAndBreadsCategory', imageUrl: '', isVeg: true,
    nutrition: {
      energy_kcal: '', protein_g: '', carbs_g: '', total_sugars_g: '',
      total_fat_g: '', saturated_fat_g: '', trans_fat_g: '', sodium_mg: ''
    }
  };

  const [formState, setFormState] = useState(initialFormState);
  const [isEditing, setIsEditing] = useState(false);
  const [showReservationDetails, setShowReservationDetails] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const currentTranslation = translations[lang] || translations.en;
  
  // NEW: Updated input handler for nested nutrition state
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('nutrition.')) {
      const key = name.split('.')[1];
      setFormState(prevState => ({
        ...prevState,
        nutrition: {
          ...prevState.nutrition,
          [key]: value
        }
      }));
    } else {
      setFormState(prevState => ({ ...prevState, [name]: type === 'checkbox' ? checked : value }));
    }
  };

  // NEW: Updated form submit to handle nutrition data
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const nutritionNumbers = {};
    if (formState.nutrition) {
      for (const key in formState.nutrition) {
        nutritionNumbers[key] = Number(formState.nutrition[key]) || 0;
      }
    }

    const finalFormState = { 
      ...formState, 
      price: Number(formState.price), 
      isVeg: Boolean(formState.isVeg),
      nutrition: nutritionNumbers
    };
    const config = { headers: getAuthHeaders() };

    try {
      if (isEditing) {
        const { data: updatedItem } = await axios.put(`${API_URL}/menu/${finalFormState.id}`, finalFormState, config);
        setMenuItems(menuItems.map(item => item._id === updatedItem._id ? updatedItem : item));
      } else {
        const { data: newItem } = await axios.post(`${API_URL}/menu`, finalFormState, config);
        setMenuItems([...menuItems, newItem]);
      }
      resetForm();
    } catch (error) {
      console.error("Failed to save menu item:", error);
      alert("Error: Could not save menu item. You may not be authorized.");
    }
  };
  
  // NEW: Updated edit click handler to populate nutrition fields
  const handleEditClick = (item) => {
    setIsEditing(true);
    const nutritionDefaults = {
      energy_kcal: '', protein_g: '', carbs_g: '', total_sugars_g: '',
      total_fat_g: '', saturated_fat_g: '', trans_fat_g: '', sodium_mg: ''
    };
    setFormState({
      ...item,
      id: item._id,
      nutrition: { ...nutritionDefaults, ...item.nutrition }
    });
  };

  const handleDeleteClick = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`${API_URL}/menu/${itemId}`, { headers: getAuthHeaders() });
        setMenuItems(menuItems.filter(item => item._id !== itemId));
      } catch (error) {
        console.error("Failed to delete item:", error);
        alert("Error: Could not delete item. You may not be authorized.");
      }
    }
  };

  const resetForm = () => { setIsEditing(false); setFormState(initialFormState); };

  const totalTables = 30;
  const reservedTables = reservations.length;
  const percentage = totalTables > 0 ? (reservedTables / totalTables) * 100 : 0;
  const circumference = 2 * Math.PI * 52;

  return (
    <div className="admin-page">
      <h2 className="section-title">Admin Dashboard</h2>
      <div className="admin-widgets-container">
        <div className="admin-section">
            <h3>Reservations</h3>
            <div className="reservation-widget">
              <svg className="progress-ring" width="120" height="120">
                <circle className="progress-ring-circle" stroke="#ff8c00" strokeWidth="8" fill="transparent" r="52" cx="60" cy="60" style={{ strokeDasharray: circumference, strokeDashoffset: circumference - (percentage / 100) * circumference }} />
              </svg>
              <div className="reservation-count">{reservedTables}/{totalTables}</div>
            </div>
            <button onClick={() => setShowReservationDetails(!showReservationDetails)} className="secondary-button" style={{ marginTop: '1rem' }}>
              {showReservationDetails ? 'Hide Details' : 'Show Details'}
            </button>
            {showReservationDetails && (
              <div className="admin-reservations-list">
                {reservations.length > 0 ? (
                  reservations.map((booking, index) => (
                    <div key={index} className="admin-item-card reservation-card">
                      <div className="admin-item-details">
                        <span>
                          <strong>{booking.name}</strong> ({booking.guests} guests)
                          <br />
                          <small>{new Date(booking.date).toLocaleDateString()} at {booking.time}</small>
                          <br />
                          <small>Occasion: {booking.occasion || 'N/A'}</small>
                          <br />
                          <small>Contact: {booking.contact}</small>
                        </span>
                      </div>
                    </div>
                  ))
                ) : (<p>No reservations yet.</p>)}
              </div>
            )}
          </div>
        <div className="admin-section">
          <h3>Orders</h3>
          <div className="orders-widget">
            <div className="order-count">{orders.length}</div>
            <p>Total Orders</p>
          </div>
          <button onClick={() => setShowOrderDetails(!showOrderDetails)} className="secondary-button" style={{ marginTop: '1rem' }}>
            {showOrderDetails ? 'Hide Details' : 'Show Details'}
          </button>
          {showOrderDetails && (
            <div className="admin-orders-list">
              {orders.length > 0 ? (
                orders.map(order => (
                  <div key={order._id} className="admin-item-card order-card">
                    <div className="admin-item-details">
                      <div>
                        <strong>Order for {order.deliveryAddress.name}</strong>
                        <br />
                        <small>Total: ₹{order.total.toFixed(2)} | Status: {order.status}</small>
                        <br />
                        <small>Address: {order.deliveryAddress.address}, {order.deliveryAddress.city}</small>
                      </div>
                      <div>
                        <ul>
                          {order.items.map(item => (
                            <li key={item._id}>{item.quantity} x {item.name}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))
              ) : (<p>No orders yet.</p>)}
            </div>
          )}
        </div>
      </div>
      <div className="admin-section">
        <h3>Manage Menu</h3>
        <form onSubmit={handleFormSubmit} className="admin-form">
          <h4>{isEditing ? 'Edit Menu Item' : 'Add New Menu Item'}</h4>
          <input type="text" name="nameKey" placeholder="Name Key (e.g., biryaniName)" value={formState.nameKey} onChange={handleInputChange} required />
          <textarea name="descriptionKey" placeholder="Description Key (e.g., biryaniDescription)" value={formState.descriptionKey} onChange={handleInputChange} required />
          <input type="number" name="price" placeholder="Price" value={formState.price} onChange={handleInputChange} required />
          <input type="text" name="imageUrl" placeholder="Image URL" value={formState.imageUrl} onChange={handleInputChange} required />
          <select name="categoryKey" value={formState.categoryKey} onChange={handleInputChange}>
            {allCategoryKeys.map(key => (<option key={key} value={key}>{currentTranslation[key] || key}</option>))}
          </select>
          <div className="admin-veg-toggle"><label><input type="checkbox" name="isVeg" checked={formState.isVeg} onChange={handleInputChange} />Vegetarian</label></div>
          
          {/* NEW: Nutrition input fields */}
          <h4 style={{ marginTop: '1.5rem', gridColumn: '1 / -1' }}>Nutrition Information (per 100g)</h4>
          <div className="admin-form-grid">
            <input type="number" step="0.1" name="nutrition.energy_kcal" placeholder="Energy (kcal)" value={formState.nutrition?.energy_kcal || ''} onChange={handleInputChange} />
            <input type="number" step="0.1" name="nutrition.protein_g" placeholder="Protein (g)" value={formState.nutrition?.protein_g || ''} onChange={handleInputChange} />
            <input type="number" step="0.1" name="nutrition.carbs_g" placeholder="Carbs (g)" value={formState.nutrition?.carbs_g || ''} onChange={handleInputChange} />
            <input type="number" step="0.1" name="nutrition.total_sugars_g" placeholder="Sugars (g)" value={formState.nutrition?.total_sugars_g || ''} onChange={handleInputChange} />
            <input type="number" step="0.1" name="nutrition.total_fat_g" placeholder="Total Fat (g)" value={formState.nutrition?.total_fat_g || ''} onChange={handleInputChange} />
            <input type="number" step="0.1" name="nutrition.saturated_fat_g" placeholder="Saturated Fat (g)" value={formState.nutrition?.saturated_fat_g || ''} onChange={handleInputChange} />
            <input type="number" step="0.1" name="nutrition.trans_fat_g" placeholder="Trans Fat (g)" value={formState.nutrition?.trans_fat_g || ''} onChange={handleInputChange} />
            <input type="number" step="0.1" name="nutrition.sodium_mg" placeholder="Sodium (mg)" value={formState.nutrition?.sodium_mg || ''} onChange={handleInputChange} />
          </div>
          
          <div className="admin-form-actions"><button type="submit" className="primary-button">{isEditing ? 'Update Item' : 'Add Item'}</button>{isEditing && <button type="button" className="secondary-button" onClick={resetForm}>Cancel Edit</button>}</div>
        </form>
        <div className="admin-item-list">
          <h4>Current Menu</h4>
          {menuItems.map(item => (<div key={item._id} className="admin-item-card"><img src={item.imageUrl} alt={item.nameKey} /><div className="admin-item-details"><span>{currentTranslation[item.nameKey]} (₹{item.price}) {item.isVeg ? '(Veg)' : '(Non-Veg)'}</span><div className="admin-item-buttons"><button onClick={() => handleEditClick(item)} className="edit-btn">Edit</button><button onClick={() => handleDeleteClick(item._id)} className="delete-btn">Delete</button></div></div></div>))}
        </div>
      </div>
      <button onClick={() => setPage('home')} className="primary-button" style={{ marginTop: '2rem' }}>Back to Home</button>
    </div>
  );
};

const Cart = ({ cartItems, setCartItems, isCartOpen, setIsCartOpen, lang, translations, setPage }) => {
  const currentTranslation = translations[lang] || translations.en;
  const handleQuantityChange = (item, delta) => {
    setCartItems(currentCart =>
      currentCart.map(cartItem =>
        cartItem._id === item._id ? { ...cartItem, quantity: Math.max(0, cartItem.quantity + delta) } : cartItem
      ).filter(cartItem => cartItem.quantity > 0)
    );
  };
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setPage('checkout');
  };

  return (
    <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
      <div className="cart-header"><h3>{currentTranslation.cartTitle}</h3><button onClick={() => setIsCartOpen(false)} className="close-btn">&times;</button></div>
      <div className="cart-items">
        {cartItems.length === 0 ? <p>Your cart is empty.</p> :
          cartItems.map(item => (
            <div key={item._id} className="cart-item">
              <img src={item.imageUrl} alt={currentTranslation[item.nameKey]} />
              <div className="cart-item-details"><p>{currentTranslation[item.nameKey]}</p><span>₹{item.price.toFixed(2)}</span></div>
              <div className="cart-item-quantity"><button onClick={() => handleQuantityChange(item, -1)}>-</button><span>{item.quantity}</span><button onClick={() => handleQuantityChange(item, 1)}>+</button></div>
            </div>
          ))}
      </div>
      <div className="cart-footer">
        <div className="cart-total"><strong>{currentTranslation.total}:</strong><span>₹{total.toFixed(2)}</span></div>
        <button onClick={() => setCartItems([])} className="secondary-button">{currentTranslation.clearCart}</button>
        <button onClick={handleCheckout} className="primary-button">{currentTranslation.checkout}</button>
      </div>
    </div>
  );
};

const AboutUsPage = ({ setPage, lang, translations }) => {
    const currentTranslation = translations[lang] || translations.en;
    const [activeSectionId, setActiveSectionId] = useState('story');
    const observer = useRef(null);
    const sectionRefs = useRef({});
    const aboutUsData = [
        { id: 'story', imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop', titleKey: 'ourStoryTitle', descriptionKey: 'ourStoryDescription' },
        { id: 'chefs', imageUrl: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?q=80&w=1974&auto=format&fit=crop', titleKey: 'ourChefsTitle', descriptionKey: 'ourChefsDescription' },
        { id: 'ingredients', imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop', titleKey: 'ourIngredientsTitle', descriptionKey: 'ourIngredientsDescription' },
    ];
    useEffect(() => {
        const options = { root: document.querySelector('.image-scroller'), rootMargin: '0px', threshold: 0.7 };
        observer.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSectionId(entry.target.dataset.id);
                }
            });
        }, options);
        const currentRefs = Object.values(sectionRefs.current);
        currentRefs.forEach(ref => {
            if (ref) observer.current.observe(ref);
        });
        return () => {
            if (observer.current) {
                currentRefs.forEach(ref => {
                    if (ref) observer.current.unobserve(ref);
                });
            }
        };
    }, []);
    const activeSection = aboutUsData.find(section => section.id === activeSectionId) || aboutUsData[0];
    return (
        <div className="about-us-page">
            <h2 className="section-title">{currentTranslation.aboutUsTitle}</h2>
            <div className="about-us-container">
                <div className="image-scroller">
                    {aboutUsData.map(section => (
                        <div key={section.id} ref={el => sectionRefs.current[section.id] = el} data-id={section.id} className={`scroll-section ${activeSectionId === section.id ? 'active' : ''}`}>
                            <img src={section.imageUrl} alt={currentTranslation[section.titleKey]} />
                        </div>
                    ))}
                </div>
                <div className="description-panel">
                    <h3>{currentTranslation[activeSection.titleKey]}</h3>
                    <p>{currentTranslation[activeSection.descriptionKey]}</p>
                </div>
            </div>
            <button onClick={() => setPage('home')} className="primary-button" style={{ marginTop: '2rem' }}>Back to Home</button>
        </div>
    );
};

const ReservationPage = ({ setPage, lang, translations, showFeedback, setReservations }) => {
  const currentTranslation = translations[lang] || translations.en;
  const [formData, setFormData] = useState({ guests: 2, date: '', time: '', occasion: '', name: '', contact: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: getAuthHeaders() };
      const { data } = await axios.post(`${API_URL}/reservations`, formData, config);
      setReservations(prev => [...prev, data.reservation]);
      showFeedback(currentTranslation.reservationSuccess);
      setPage('home');
    } catch (error) {
      console.error("Failed to make reservation:", error);
      alert("You must be logged in to make a reservation.");
      setPage('login');
    }
  };

  return (
    <div className="reservation-page">
      <div className="reservation-form-card">
        <h2 className="section-title">{currentTranslation.reservationTitle}</h2>
        <form onSubmit={handleSubmit} className="reservation-form">
          <div className="form-group"><label htmlFor="guests">{currentTranslation.numGuests}</label><input type="number" id="guests" name="guests" min="1" max="20" value={formData.guests} onChange={handleInputChange} required /></div>
          <div className="form-group"><label htmlFor="date">{currentTranslation.date}</label><input type="date" id="date" name="date" value={formData.date} onChange={handleInputChange} required /></div>
          <div className="form-group"><label htmlFor="time">{currentTranslation.time}</label><input type="time" id="time" name="time" value={formData.time} onChange={handleInputChange} required /></div>
          <div className="form-group"><label htmlFor="occasion">{currentTranslation.occasion}</label><input type="text" id="occasion" name="occasion" value={formData.occasion} onChange={handleInputChange} /></div>
          <div className="form-group"><label htmlFor="name">{currentTranslation.fullName}</label><input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required /></div>
          <div className="form-group"><label htmlFor="contact">{currentTranslation.contactNumber}</label><input type="tel" id="contact" name="contact" value={formData.contact} onChange={handleInputChange} required /></div>
          <button type="submit" className="primary-button full-width">{currentTranslation.bookNow}</button>
        </form>
        <button onClick={() => setPage('home')} className="back-to-home-button" style={{ marginTop: '1.5rem' }}>Back to Home</button>
      </div>
    </div>
  );
};

// --- NEW CHECKOUT PAGE COMPONENT ---
const CheckoutPage = ({ cartItems, setPage, showFeedback, setCartItems, lang, translations, fetchAdminData, setLastPlacedOrder }) => {
  const currentTranslation = translations[lang] || translations.en;
  const [formData, setFormData] = useState({ name: '', address: '', city: '', postalCode: '' });
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    const orderData = {
      items: cartItems.map(({ nameKey, quantity, price }) => ({
        name: currentTranslation[nameKey],
        quantity,
        price,
      })),
      total,
      deliveryAddress: formData,
    };

    try {
      const { data: newOrder } = await axios.post(`${API_URL}/orders`, orderData, { headers: getAuthHeaders() });
      
      showFeedback(currentTranslation.orderSuccessMessage);
      setCartItems([]);
      fetchAdminData(); // Refresh admin data
      setLastPlacedOrder(newOrder); // Save the order for the confirmation page
      setPage('order-confirmation'); // Navigate to the confirmation page
    } catch (error) {
      console.error("Failed to place order:", error);
      if (error.response && error.response.status === 401) {
        alert("You must be logged in to place an order.");
        setPage('login');
      } else {
        alert("Error: Could not place your order. Please try again.");
      }
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-form-card">
        <h2 className="section-title">{currentTranslation.checkoutTitle}</h2>
        <div className="order-summary">
          <h3>{currentTranslation.orderSummary}</h3>
          {cartItems.map(item => (
            <div key={item._id} className="summary-item">
              <span>{item.quantity} x {currentTranslation[item.nameKey]}</span>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="summary-total">
            <strong>{currentTranslation.total}:</strong>
            <strong>₹{total.toFixed(2)}</strong>
          </div>
        </div>
        <form onSubmit={handlePlaceOrder} className="checkout-form">
          <h3>{currentTranslation.deliveryAddress}</h3>
          <div className="form-group">
            <label htmlFor="name">{currentTranslation.fullName}</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="address">{currentTranslation.address}</label>
            <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="city">{currentTranslation.city}</label>
            <input type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="postalCode">{currentTranslation.postalCode}</label>
            <input type="text" id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleInputChange} required />
          </div>
          <button type="submit" className="primary-button full-width">{currentTranslation.placeOrder}</button>
        </form>
        <button onClick={() => setPage('home')} className="back-to-home-button" style={{ marginTop: '1.5rem' }}>Back to Home</button>
      </div>
    </div>
  );
};
// --- NEW RECOMMENDATIONS COMPONENT ---
const Recommendations = ({ recommendations, isLoading, handleAddToCart, currentTranslation }) => {
  if (isLoading) {
    return (
      <div className="recommendations-container">
        <h2 className="section-title">{currentTranslation.recommendationsTitle}</h2>
        <p>Thinking of some delicious suggestions...</p>
      </div>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    return null; // Don't show anything if there are no recommendations
  }

  return (
    <div className="recommendations-container">
      <h2 className="section-title">{currentTranslation.recommendationsTitle}</h2>
      <section className="menu-items-grid">
        {recommendations.map((item) => (
          <div key={item._id} className="menu-item-card">
            <img src={item.imageUrl} alt={currentTranslation[item.nameKey]} className="menu-item-image" />
            <div className="menu-item-details">
              <h3 className="menu-item-name">{currentTranslation[item.nameKey]}</h3>
              <p className="menu-item-description">{currentTranslation[item.descriptionKey]}</p>
              <div className="menu-item-footer">
                <span className="menu-item-price">₹{item.price.toFixed(2)}</span>
                <button onClick={() => handleAddToCart(item)} className="primary-button small-button">{currentTranslation.addToCart}</button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
const ContactUsPage = ({ setPage, lang, translations }) => {
  const currentTranslation = translations[lang] || translations.en;
  const mapRef = useRef(null); // To hold the map instance

  useEffect(() => {
    // Check if the map has already been initialized
    if (!mapRef.current) {
      // Coordinates for Vijayawada, Andhra Pradesh
      const restaurantLocation = [16.5062, 80.6480];
      
      // Initialize the map
      const map = L.map('delivery-map').setView(restaurantLocation, 14);
      mapRef.current = map; // Store the map instance

      // Add the map tiles (the visual map background)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Add a marker for the restaurant
      L.marker(restaurantLocation).addTo(map)
        .bindPopup('<b>The Grand Feast</b><br>Vijayawada, AP').openPopup();

      // Add a circle to show the delivery radius (5km)
      L.circle(restaurantLocation, {
        color: 'orange',
        fillColor: '#ff8c00',
        fillOpacity: 0.2,
        radius: 5000 // in meters
      }).addTo(map);
    }
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="contact-us-page">
      <div className="contact-us-card">
        <h2 className="section-title">{currentTranslation.contactUsTitle}</h2>
        <div id="delivery-map" style={{ height: '400px', width: '100%', borderRadius: '10px', marginBottom: '1rem' }}></div>
        <div className="contact-details">
            <h3>{currentTranslation.ourAddress}</h3>
            <p>123 Food Street, Benz Circle, Vijayawada, Andhra Pradesh</p>
            <h3>{currentTranslation.deliveryArea}</h3>
        </div>
        <button onClick={() => setPage('home')} className="primary-button" style={{ marginTop: '1.5rem' }}>Back to Home</button>
      </div>
    </div>
  );
};
const OrderConfirmationPage = ({ order, setPage, lang, translations }) => {
  const currentTranslation = translations[lang] || translations.en;
  const mapRef = useRef(null);

  useEffect(() => {
    if (!order) {
      const timer = setTimeout(() => setPage('home'), 2000);
      return () => clearTimeout(timer);
    } else if (!mapRef.current) {
      const restaurantLocation = [16.5062, 80.6480];
      const customerLocation = [16.5162, 80.6580];

      const map = L.map('confirmation-map').setView(customerLocation, 14);
      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      L.marker(restaurantLocation).addTo(map)
        .bindPopup('<b>The Grand Feast</b><br>Your order is on its way!').openPopup();

      L.marker(customerLocation).addTo(map)
        .bindPopup(`<b>Your Delivery Address</b><br>${order.deliveryAddress.address}`);
    }
  }, [order, setPage]);

  if (!order) {
    return (
      <div className="order-confirmation-page">
        <p>No order details found. Returning to home...</p>
      </div>
    );
  }

  return (
    <div className="order-confirmation-page">
      <div className="order-confirmation-card">
        <h2 className="section-title">{currentTranslation.orderConfirmationTitle}</h2>
        <p>{currentTranslation.orderConfirmationMsg}</p>
        <div className="order-summary">
          <h3>{currentTranslation.orderSummary}</h3>
          {order.items.map((item, index) => (
            <div key={index} className="summary-item">
              <span>{item.quantity} x {item.name}</span>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="summary-total">
            <strong>{currentTranslation.total}:</strong>
            <strong>₹{order.total.toFixed(2)}</strong>
          </div>
        </div>
        <div id="confirmation-map" style={{ height: '300px', width: '100%', borderRadius: '10px', marginTop: '1rem' }}></div>
        <button onClick={() => setPage('home')} className="primary-button" style={{ marginTop: '1.5rem' }}>Back to Home</button>
      </div>
    </div>
  );
};

const MyOrdersPage = ({ orders, setPage, lang, translations }) => {
  const currentTranslation = translations[lang] || translations.en;

  return (
    <div className="my-orders-page">
      <div className="my-orders-card">
        <h2 className="section-title">{currentTranslation.myOrdersTitle}</h2>
        <div className="orders-list">
          {orders.length > 0 ? (
            orders.map(order => (
              <div key={order._id} className="order-item-card">
                <div className="order-item-header">
                  <strong>Order on {new Date(order.createdAt).toLocaleDateString()}</strong>
                  <span>Status: {order.status}</span>
                </div>
                <div className="order-item-body">
                  <ul>
                    {order.items.map(item => (
                      <li key={item._id}>{item.quantity} x {item.name}</li>
                    ))}
                  </ul>
                </div>
                <div className="order-item-footer">
                  <strong>Total: ₹{order.total.toFixed(2)}</strong>
                </div>
              </div>
            ))
          ) : (
            <p>You haven't placed any orders yet.</p>
          )}
        </div>
        <button onClick={() => setPage('home')} className="primary-button" style={{ marginTop: '1.5rem' }}>Back to Home</button>
      </div>
    </div>
  );
};

// --- NEW NUTRITION MODAL COMPONENT ---
const NutritionModal = ({ item, onClose, currentTranslation }) => {
  if (!item || !item.nutrition) return null;

  const nutritionData = [
    { label: 'Energy', value: `${item.nutrition.energy_kcal || 0} kcal` },
    { label: 'Protein', value: `${item.nutrition.protein_g || 0} g` },
    { label: 'Carbohydrate', value: `${item.nutrition.carbs_g || 0} g` },
    { label: 'Total Sugars', value: `${item.nutrition.total_sugars_g || 0} g` },
    { label: 'Total Fat', value: `${item.nutrition.total_fat_g || 0} g` },
    { label: 'Saturated Fat', value: `${item.nutrition.saturated_fat_g || 0} g` },
    { label: 'Trans Fat', value: `${item.nutrition.trans_fat_g || 0} g` },
    { label: 'Sodium', value: `${item.nutrition.sodium_mg || 0} mg` },
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Nutrition Information for {currentTranslation[item.nameKey]}</h3>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>
        <div className="modal-body">
          <p>Approximate values per serving.</p>
          <table className="nutrition-table">
            <thead>
              <tr>
                <th>Nutrient</th>
                <th>Value per 100g (approx.)</th>
              </tr>
            </thead>
            <tbody>
              {nutritionData.map(nutrient => (
                <tr key={nutrient.label}>
                  <td>{nutrient.label}</td>
                  <td>{nutrient.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState('');
  const [lang, setLang] = useState('en');
  const [showMenuSection, setShowMenuSection] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('allCategories');
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [isRecsLoading, setIsRecsLoading] = useState(true);
  const currentTranslation = translations[lang] || translations.en;
  const [lastPlacedOrder, setLastPlacedOrder] = useState(null);
  const [myOrders, setMyOrders] = useState([]); // This line was missing
  const [aiStatus, setAiStatus] = useState('ready');
  const [selectedNutriItem, setSelectedNutriItem] = useState(null); // NEW: State for nutrition modal
  const WIT_AI_TOKEN = 'ERKC4HLDBACCSX3BS755IS4UXAQWSM5W';

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const sendToWitAi = async (text) => {
    try {
      setAiStatus('processing');
      console.log(`Sending to Wit.ai: "${text}"`);
      const response = await axios.get(`https://api.wit.ai/message?v=20230215&q=${encodeURIComponent(text)}`, {
        headers: {
          Authorization: `Bearer ${WIT_AI_TOKEN}`,
        },
      });
      processWitAiResponse(response.data);
    } catch (error) {
      console.error("Wit.ai error:", error);
      showFeedback("Sorry, I had trouble understanding that.");
    } finally {
      setAiStatus('ready');
    }
  };

  useEffect(() => {
    if (!listening && transcript) {
      console.log("Final Transcript:", transcript);
      sendToWitAi(transcript);
      resetTranscript();
    }
  }, [listening, transcript]);


  useEffect(() => {
    if (listening) {
      setAiStatus('listening');
    } else if (aiStatus !== 'processing') {
      setAiStatus('ready');
    }
  }, [listening, aiStatus]);


  if (!browserSupportsSpeechRecognition) {
    console.error("Browser doesn't support speech recognition.");
  }

  const processWitAiResponse = (response) => {
    const intent = response.intents?.[0]?.name;
    const foodEntity = response.entities['food_item:food_item']?.[0]?.value;
    const numberEntity = response.entities['wit$number:number']?.[0]?.value;
    const quantity = numberEntity || 1;

    console.log("Wit.ai Response:", { intent, foodEntity, quantity });

    if (intent === 'addToCart' && foodEntity) {
      const itemToAdd = menuItems.find(item =>
        currentTranslation[item.nameKey] && currentTranslation[item.nameKey].toLowerCase() === foodEntity.toLowerCase()
      );
      if (itemToAdd) {
        handleAddToCart(itemToAdd, quantity);
      } else {
        showFeedback(`Sorry, I couldn't find ${foodEntity} on the menu.`);
      }
    } else if (intent === 'removeFromCart' && foodEntity) {
        const itemToRemove = cartItems.find(item => 
          currentTranslation[item.nameKey] && currentTranslation[item.nameKey].toLowerCase() === foodEntity.toLowerCase()
        );
        if (itemToRemove) {
            handleRemoveFromCart(itemToRemove);
        } else {
            showFeedback(`Sorry, I couldn't find ${foodEntity} in your cart.`);
        }
    } else if (intent === 'searchMenu' && foodEntity) {
        setSearchTerm(foodEntity);
        setShowMenuSection(true);
    } else if (intent === 'clearCart') {
        setCartItems([]);
        showFeedback("Your cart has been cleared.");
    } else if (intent === 'getCartContents') {
        if (cartItems.length === 0) {
            showFeedback("Your cart is empty.");
        } else {
            const itemNames = cartItems.map(item => `${item.quantity} ${currentTranslation[item.nameKey]}`).join(', ');
            showFeedback(`You have: ${itemNames}.`);
        }
    } else if (intent === 'checkout') {
      setIsCartOpen(false);
      setPage('checkout');
    }
    else {
      showFeedback("Sorry, I didn't understand that command.");
    }
  };

  const fetchAdminData = async () => {
      if (isLoggedIn && isAdmin) {
        try {
          const [reservationsRes, ordersRes] = await Promise.all([
            axios.get(`${API_URL}/reservations`, { headers: getAuthHeaders() }),
            axios.get(`${API_URL}/orders`, { headers: getAuthHeaders() })
          ]);
          setReservations(reservationsRes.data);
          setOrders(ordersRes.data);
        } catch (error) {
          console.error("Failed to fetch admin data:", error);
        }
      }
    };

  // NEW: Function to fetch orders for a logged-in customer
  const fetchMyOrders = async () => {
    if (isLoggedIn && !isAdmin) {
      try {
        const { data } = await axios.get(`${API_URL}/orders/myorders`, { headers: getAuthHeaders() });
        setMyOrders(data);
      } catch (error) {
        console.error("Failed to fetch my orders:", error);
      }
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/menu`);
        setMenuItems(data);
      } catch (error) {
        console.error("Failed to fetch menu items:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchAdminData();
    } else {
      fetchMyOrders();
    }
  }, [isLoggedIn, isAdmin]);


  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/menu`);
        setMenuItems(data);
      } catch (error) {
        console.error("Failed to fetch menu items:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMenuItems();
  }, []);

  useEffect(() => {
    fetchAdminData();
  }, [isLoggedIn, isAdmin]);

  // NEW: useEffect to fetch recommendations
  useEffect(() => {
    const fetchRecommendations = async () => {
      if (showMenuSection) { // Only fetch when the menu is visible
        setIsRecsLoading(true);
        try {
          // This is where we will call our new backend endpoint
          // For now, it's a placeholder
          console.log("Fetching AI recommendations...");
           const { data } = await axios.get(`${API_URL}/recommendations`);
           setRecommendations(data);
        } catch (error) {
          console.error("Failed to fetch recommendations:", error);
        } finally {
          // In a real scenario, you'd set loading to false here.
          setIsRecsLoading(false); 
        }
      }
    };
    fetchRecommendations();
  }, [showMenuSection]);

  const handleAddToCart = (itemToAdd, quantity = 1) => {
    setCartItems(currentCart => {
      const existingItem = currentCart.find(item => item._id === itemToAdd._id);
      if (existingItem) {
        return currentCart.map(item => item._id === itemToAdd._id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...currentCart, { ...itemToAdd, quantity: quantity }];
    });
    showFeedback(`${quantity} ${currentTranslation[itemToAdd.nameKey]} added to cart.`);
  };

  const handleRemoveFromCart = (itemToRemove) => {
    setCartItems(currentCart => currentCart.filter(item => item._id !== itemToRemove._id));
    showFeedback(`${currentTranslation.itemRemoved}: ${currentTranslation[itemToRemove.nameKey]}`);
  };

  const showFeedback = (message) => {
    setFeedbackMessage(message);
    setTimeout(() => setFeedbackMessage(''), 3000);
  };

  useEffect(() => {
    const handleScroll = () => { setIsScrolled(window.scrollY > 10); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuSectionRef = useRef(null);
  const contactSectionRef = useRef(null);

  useEffect(() => { if (showMenuSection && menuSectionRef.current) { menuSectionRef.current.scrollIntoView({ behavior: 'smooth' }); } }, [showMenuSection]);

  const categoryDisplayOrder = ['indianAppetizersCategory', 'chineseAppetizersCategory', 'biryaniAndPulaoCategory', 'curriesAndBreadsCategory', 'chineseMainCourseCategory', 'beveragesCategory', 'dessertsCategory'];
  const sortedUniqueCategoryKeys = menuItems.length > 0 ? [...new Set(menuItems.map(item => item.categoryKey))].sort((a, b) => categoryDisplayOrder.indexOf(a) - categoryDisplayOrder.indexOf(b)) : [];
  const categoryKeysForFilter = ['allCategories', ...sortedUniqueCategoryKeys];
  console.log("Checking menu items data:", menuItems);
  const filteredAndSortedMenuItems = menuItems
    .sort((a, b) => {
      const categoryIndexA = categoryDisplayOrder.indexOf(a.categoryKey);
      const categoryIndexB = categoryDisplayOrder.indexOf(b.categoryKey);
      if (categoryIndexA !== categoryIndexB) return categoryIndexA - categoryIndexB;
      if (a.isVeg !== b.isVeg) return b.isVeg - a.isVeg;
      return (currentTranslation[a.nameKey] || a.nameKey).localeCompare(currentTranslation[b.nameKey] || b.nameKey);
    })
    .filter(item => selectedCategory === 'allCategories' || item.categoryKey === selectedCategory)
    .filter(item => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      return (currentTranslation[item.nameKey] || '').toLowerCase().includes(lowerCaseSearchTerm) || (currentTranslation[item.categoryKey] || '').toLowerCase().includes(lowerCaseSearchTerm) || (currentTranslation[item.descriptionKey] || '').toLowerCase().includes(lowerCaseSearchTerm);
    });

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserName('');
    setPage('home');
    setShowMenuSection(false);
  };

  const scrollToSection = (ref) => { if (ref.current) { ref.current.scrollIntoView({ behavior: 'smooth' }); } };

  const renderPage = () => {
    switch (page) {
      case 'home': return (<main className="main-content"><section className="hero-section"><div className="hero-overlay"></div><div className="hero-text-content"><p className="hero-welcome-text">{currentTranslation.welcomeToRestaurant}</p><h1 className="hero-main-text">{currentTranslation.eatHealthy}</h1><p className="restaurant-short-description">{currentTranslation.restaurantShortDescription}</p><div className="hero-buttons"><button onClick={() => setShowMenuSection(true)} className="primary-button">{currentTranslation.ourMenu}</button></div></div></section>{showMenuSection && (<><h2 id="menu-items-section" ref={menuSectionRef} className="section-title">{currentTranslation.orderFood}</h2><div className="filter-container"><div className="search-bar-wrapper"><input type="text" placeholder={currentTranslation.searchPlaceholder} className="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div><select className="category-filter" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>{categoryKeysForFilter.map(key => (<option key={key} value={key}>{currentTranslation[key] || key}</option>))}</select></div><section className="menu-items-grid">{filteredAndSortedMenuItems.length > 0 ? (filteredAndSortedMenuItems.map((item) => (<div key={item._id} className="menu-item-card"><img src={item.imageUrl} alt={currentTranslation[item.nameKey]} className="menu-item-image" /><div className="menu-item-details">
        {/* NEW: Display name with clickable calories */}
        <h3 className="menu-item-name">
            {currentTranslation[item.nameKey]}
            {item.nutrition && item.nutrition.energy_kcal > 0 && (
                <span 
                    className="calorie-info" 
                    onClick={() => setSelectedNutriItem(item)}
                    title="View Nutrition Info"
                >
                    ({item.nutrition.energy_kcal} kcal)
                </span>
            )}
        </h3>
        <p className="menu-item-description">{currentTranslation[item.descriptionKey]}</p><p className="menu-item-category">{currentTranslation.category}: {currentTranslation[item.categoryKey]}</p><div className="menu-item-footer"><span className="menu-item-price">₹{item.price.toFixed(2)}</span><button onClick={() => handleAddToCart(item)} className="primary-button small-button">{currentTranslation.addToCart}</button></div></div></div>))) : (<p className="no-items-message">{currentTranslation.noItemsFound}</p>)}</section>
            <Recommendations recommendations={recommendations} isLoading={isRecsLoading} handleAddToCart={handleAddToCart} currentTranslation={currentTranslation} />
            </>)}</main>);
      case 'login': return <AuthPage setPage={setPage} setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} lang={lang} setIsAdmin={setIsAdmin} />;
      case 'admin': return <AdminPage menuItems={menuItems} setMenuItems={setMenuItems} setPage={setPage} translations={translations} lang={lang} reservations={reservations} allCategoryKeys={categoryDisplayOrder} orders={orders} />;
      case 'about': return <AboutUsPage setPage={setPage} lang={lang} translations={translations} />;
      case 'reservation': return <ReservationPage setPage={setPage} lang={lang} translations={translations} showFeedback={showFeedback} setReservations={setReservations} />;
      // AFTER (With the setLastPlacedOrder prop added)
case 'checkout': return <CheckoutPage cartItems={cartItems} setPage={setPage} showFeedback={showFeedback} setCartItems={setCartItems} lang={lang} translations={translations} fetchAdminData={fetchAdminData} setLastPlacedOrder={setLastPlacedOrder} />;
      // NEW: Render the Contact Us page
      case 'contact': return <ContactUsPage setPage={setPage} lang={lang} translations={translations} />;     
case 'order-confirmation': return <OrderConfirmationPage order={lastPlacedOrder} setPage={setPage} lang={lang} translations={translations} />;
case 'my-orders': return <MyOrdersPage orders={myOrders} setPage={setPage} lang={lang} translations={translations} />;       
default: return <div>Page not found</div>;
    }
  };

  return (
    <div className="app-container">
      {/* NEW: Render nutrition modal when an item is selected */}
      {selectedNutriItem && <NutritionModal item={selectedNutriItem} onClose={() => setSelectedNutriItem(null)} currentTranslation={currentTranslation} />}
      
      {isCartOpen && <div className="cart-backdrop" onClick={() => setIsCartOpen(false)}></div>}
      <Cart cartItems={cartItems} setCartItems={setCartItems} isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} lang={lang} translations={translations} setPage={setPage} />
      {feedbackMessage && <div className="feedback-toast">{feedbackMessage}</div>}
      <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="logo">The Grand Feast</div>
        {!isAdmin && (
          <nav className="main-nav">
            <button onClick={() => { setPage('home'); setShowMenuSection(false); }} className={`nav-link ${page === 'home' ? 'active' : ''}`}>{currentTranslation.home}</button>
            <button onClick={() => setPage('about')} className={`nav-link ${page === 'about' ? 'active' : ''}`}>{currentTranslation.aboutUs}</button>
            <button onClick={() => setPage('reservation')} className={`nav-link ${page === 'reservation' ? 'active' : ''}`}>{currentTranslation.reservation}</button>
           <button onClick={() => setPage('contact')} className="nav-link">{currentTranslation.contactUs}</button>
</nav>
        )}
        <div className="header-actions">
          {isLoggedIn ? (
            <>
              <span className="user-greeting">Hi, {userName}</span>
              {!isAdmin && <button onClick={() => setPage('my-orders')} className="secondary-button">My Orders</button>}
              <button onClick={handleLogout} className="secondary-button">{currentTranslation.logout}</button>
              {isAdmin && <button onClick={() => setPage('admin')} className="primary-button">{currentTranslation.adminPanel}</button>}
            </>
          ) : (
            <button onClick={() => setPage('login')} className="primary-button">{currentTranslation.signIn}</button>
          )}
          {!isAdmin && (
            <button className="cart-button" onClick={() => setIsCartOpen(true)}>🛒{cartItems.length > 0 && <span className="cart-badge">{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>}</button>
          )}
        </div>
      </header>
      {renderPage()}
      {!isAdmin && (
        <>
          <AIAssistant 
            status={aiStatus}
            onClick={() => {
              if (listening) {
                SpeechRecognition.stopListening();
              } else {
                resetTranscript();
                SpeechRecognition.startListening({ continuous: false });
              }
            }}
          />
          <footer id="contact-us-section" ref={contactSectionRef} className="main-footer">
            <div className="footer-content">
              <p className="footer-title">The Grand Feast</p>
              <p className="footer-copyright">&copy; {new Date().getFullYear()} {currentTranslation.allRightsReserved}</p>
              <div className="footer-links"><button className="footer-link-button">{currentTranslation.privacyPolicy}</button><button className="footer-link-button">{currentTranslation.termsOfService}</button><button className="footer-link-button">{currentTranslation.contactUs}</button></div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default App;