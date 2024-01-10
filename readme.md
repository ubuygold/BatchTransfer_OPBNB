## 功能
在BNB上进行批量转账，合约支持转BNB和ERC20代币，这个脚本只做了转BNB的功能，需要ERC20的朋友可以自行研究或者等更新

## 用法
1. 安装Node.js
2. 克隆或下载本项目
3. 在目录下运行 npm install
4. 将.env.example文件改名为.env，将在PK=后面填写自己的钱包私钥（去掉开头的0x）
5. 将addresses.csv.example改名为addresses.csv，并在里面按格式填写目标地址和对应的BNB数量
6. 运行ts-node index.ts
