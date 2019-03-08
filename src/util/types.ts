import { BigNumber, OrderStatus } from '0x.js';
import { SignedOrder } from '@0x/connect';
import { RouterState } from 'connected-react-router';

export interface TabItem {
    active: boolean;
    onClick: any;
    text: string;
}

export interface Token {
    address: string;
    decimals: number;
    name: string;
    symbol: string;
    primaryColor: string;
}

export interface TokenBalance {
    balance: BigNumber;
    isUnlocked: boolean;
    token: Token;
}

export enum Web3State {
    Done,
    Error,
    Loading,
}

export interface BlockchainState {
    readonly ethAccount: string;
    readonly web3State: Web3State;
    readonly tokenBalances: TokenBalance[];
    readonly ethBalance: BigNumber;
    readonly wethBalance: BigNumber;
}

export interface RelayerState {
    readonly orders: UIOrder[];
    readonly userOrders: UIOrder[];
    readonly selectedToken: Token | null;
}

export interface UIState {
    readonly notifications: Notification[];
    readonly hasUnreadNotifications: boolean;
    readonly stepsModal: StepsModalState;
}

export interface StoreState {
    readonly router: RouterState;
    readonly blockchain: BlockchainState;
    readonly relayer: RelayerState;
    readonly ui: UIState;
}

export enum StepKind {
    BuySellLimit,
}

export interface StepBuySellLimitOrder {
    kind: StepKind.BuySellLimit;
    amount: BigNumber;
    price: BigNumber;
    side: OrderSide;
}

export type Step = StepBuySellLimitOrder;

export interface StepsModalState {
    readonly doneSteps: Step[];
    readonly currentStep: Step | null;
    readonly pendingSteps: Step[];
}

export enum OrderSide {
    Sell,
    Buy,
}

export interface UIOrder {
    rawOrder: SignedOrder;
    side: OrderSide;
    size: BigNumber;
    filled: BigNumber;
    price: BigNumber;
    status: OrderStatus;
}

export interface OrderBookItem {
    side: OrderSide;
    size: BigNumber;
    price: BigNumber;
}

export interface OrderBook {
    buyOrders: OrderBookItem[];
    sellOrders: OrderBookItem[];
    mySizeOrders: OrderBookItem[];
    spread: BigNumber;
}

interface BaseNotification {
    timestamp: Date;
}

interface CancelOrderNotification extends BaseNotification {
    kind: 'CancelOrderNotification';
    amount: BigNumber;
    token: Token;
}

interface MarketNotification extends BaseNotification {
    kind: 'MarketNotification';
    amount: BigNumber;
    token: Token;
    tx: Promise<any>;
    side: OrderSide;
}

interface LimitNotification extends BaseNotification {
    kind: 'LimitNotification';
    amount: BigNumber;
    token: Token;
    side: OrderSide;
}

export type Notification = CancelOrderNotification | MarketNotification | LimitNotification;
