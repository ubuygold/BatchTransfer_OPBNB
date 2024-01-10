import { ethers } from "ethers";
import abi from "./abi.json";
import dotenv from "dotenv";
import * as fs from 'fs';
import csv from 'csv-parser';
import _ from "lodash"

dotenv.config();

const provider = new ethers.providers.JsonRpcProvider("https://opbnb-mainnet-rpc.bnbchain.org");
const wallet = new ethers.Wallet(process.env.PK!, provider);

const contract = new ethers.Contract(
	"0x4984717D4f0B729748CE9314b367C55E85E0cBF4",
	abi,
	wallet,
);
console.log(contract)
console.log(wallet.address)
const addresses: string[] = []; // 存储第一列数据
const amounts: string[] = []; // 存储第二列数据

// 修改以下路径为你的CSV文件路径
const csvFilePath = './addresses.csv';

const main = async () => { 
	const convertAddr = addresses.map(address => ethers.utils.getAddress(address))
	console.log(convertAddr)
	const convertAmt = amounts.map(amount => ethers.utils.parseEther(amount as string))
	console.log(convertAmt)
	const totalAmount = _.sum(amounts.map(amount=>parseFloat(amount))) 
	const tx = await contract.batchTransfer(convertAddr, convertAmt, ethers.utils.getAddress("0x0000000000000000000000000000000000000000"),{value: ethers.utils.parseEther(totalAmount.toString())});
	await tx.wait()
};

fs.createReadStream(csvFilePath)
	.pipe(csv())
	.on('data', (data) => {
		const entries: string[] = Object.values(data); // 将行数据转换为值数组
		if (entries.length >= 2) { // 确保至少有两列数据
			addresses.push(entries[0]); // 第一列数据
			amounts.push(entries[1]); // 第二列数据
		}
	})
	.on('end', () => {
		console.log('CSV file successfully processed');
		console.log('Column 1:', addresses);
		console.log('Column 2:', amounts);
		main()
	});