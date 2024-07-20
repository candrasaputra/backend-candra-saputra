import { init } from 'src/init';
import { sleep } from 'src/libs/sleep';
import { getUserRepository, getProductRepository } from 'src/libs/typeorm/repositories';
import { randomUUID } from 'crypto';
import { ERole } from 'src/services/types';

(async () => {
    const { dataSource } = await init();

    const userRepository = getUserRepository(dataSource);
    const productRepository = getProductRepository(dataSource);

    console.log('Seed users');
    await userRepository.insert([
        {
            id: randomUUID(),
            username: 'customer',
            address: 'jakarta',
            role: ERole.CUSTOMER
        },
        {
            id: randomUUID(),
            username: 'merchant',
            address: 'jogja',
            role: ERole.MERCHANT
        }
    ]);

    console.log('Seed products');
    await productRepository.insert([
        {
            id: randomUUID(),
            title: 'kambing',
            description: 'ini kambing',
            price: 1000
        },
        {
            id: randomUUID(),
            title: 'ayam',
            description: 'ini ayam',
            price: 2300
        }
    ]);

    console.log('Seeding done');
    process.exit(-1);
})().catch(async (err) => {
    console.error(err, {}, 'Uncaught error when initializing scripts');
    await sleep(2000);
    process.exit(-1);
});
