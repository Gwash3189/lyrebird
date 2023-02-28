const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
  log:
      process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
});

async function wrapInLog(start, stop, func) {
  console.log('')
  console.log(`~~~ ${start} ~~~`)
  console.log('')
  const result = await func()
  console.log('')
  console.log(`~~~ ${stop} ~~~`)
  console.log('')

  return result
}

(async function() {
  console.log('~~~ Starting ~~~')

  await wrapInLog(
    'Deleting existing data',
    'Finished deleting data',
    async () => {

    }
  )

  console.log('~~~ Complete ~~~')
})();





