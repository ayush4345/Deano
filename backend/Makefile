deploy:
	forge script ./script/Payout.s.sol --rpc-url https://rpc.ankr.com/polygon_mumbai --private-key '7c55407956636a1c3c63962e32086b07824f50da72ad2091933c1ba11940b15f' --broadcast

deploy-scroll:
	forge script ./script/Payout.s.sol --rpc-url https://rpc.ankr.com/scroll_sepolia_testnet --legacy --private-key 'e83738dec068da5d3b9911bced8201cfc083db74149508f5f559701ea0209e69' --broadcast 

local:
	forge script DeployPayout --rpc-url http://localhost:8545 -vv --mnemonics 'test test test test test test test test test test test junk' --sender '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' --broadcast