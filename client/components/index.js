/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'

//Available to Logged-In Users
export {default as UserHome} from './user-home'
export {default as AdminUsers} from './admin-users'
export {default as AllOrders} from './AllOrders'
export {default as SingleOrder} from './SingleOrder'

//Available to All Users
export {default as AllProducts} from './AllProducts'
export {default as SingleProduct} from './SingleProduct'
export {default as Cart} from './Cart'
export {default as ConfirmationPage} from './Confirmation'

//Login & Signup
export {Login, Signup} from './auth-form'
