'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models/')
const {Product} = require('../server/db/models/')
const {Order} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Cody',
      lastName: 'Murphy',
      phone: '219-555-6897',
      address: '555 Whatever Lane, Whatever, NE 55555',
      email: 'cody@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'CodyAnn',
      lastName: 'Smith',
      phone: '219-555-6898',
      address: '554 Whatever Lane, Whatever, NE 55555',
      email: 'codyann@email.com',
      password: '123'
    })
  ])

  const products = await Promise.all([
    Product.create({
      name: 'Cat',
      description:
        'Our eco-friendliest object of destruction, a Cat will be more than adequate for your vase-smashing needs',
      imageUrl: '',
      quantity: 10,
      price: 200.95
    }),
    Product.create({
      name: 'Catapult',
      description:
        'Defend your abode medieval-style with this limited-edition weapon of vase destruction',
      imageUrl: '',
      quantity: 10,
      price: 149.95
    }),
    Product.create({
      name: 'Slingshot',
      description:
        'Craving simplicity in your vase destruction routine? You will love our vase-optimized slingshot. Whether you shoot at that dastardly vase with a pebble or load up the infernal pottery itself, you are guaranteed to be in a shard pile in no time',
      imageUrl: '',
      quantity: 10,
      price: 24.95
    })
  ])

  const orders = await Promise.all([
    Order.create({
      orderNumber: 1,
      productList: '',
      subTotal: 0.0
    }),
    Order.create({
      orderNumber: 2,
      productList: '',
      subTotal: 0.0
    }),
    Order.create({
      orderNumber: 3,
      productList: '',
      subTotal: 0.0
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
