// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/utils/math/SafeCast.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@chainlink/contracts/src/v0.8/interfaces/FeedRegistryInterface.sol";

contract Schain {
    using SafeCast for int256;
    using SafeMath for uint256;

    AggregatorV3Interface internal eth_usd_price_feed;

    //roles and address
    mapping(string => UserRole) roles;
    // mapping(uint=>  mapping (string => UserRole)) roless;
    mapping(uint256 => OrderItem) orders;
    mapping(uint256 => ProductItem) public idToProductItem;
    uint256 public usersCount = 0;
    uint256 public ordersCount = 0;
    uint256 private rolesCount = 0;
    uint256 public productCount = 0;
    address payable companyAddress;

    // uint public orderConfirmed = 0;
    // uint public ordersRecieved = 0;

    constructor() {
        companyAddress = payable(msg.sender);
        eth_usd_price_feed = AggregatorV3Interface(
            0x9326BFA02ADD2366b30bacB125260Af641031331
        );
    }

    struct ProductItem {
        uint256 id;
        string name;
        uint256 price;
        string hash;
        string category;
        uint256 manufactureDate;
        uint256 expiryDate;
    }

    struct UserRole {
        uint256 id;
        string role;
        address roleaddress;
    }

    struct OrderItem {
        uint256 id;
        address owner;
        string product;
        uint256 quantity;
        uint256 orderdate;
        uint256 price;
        string addressLine;
        string contact;
        string city;
        string review;
        string zipcode;
        string state;
        uint256 recievedate;
        uint256 confirmdate;
        uint256 producedate;
        uint256 testdate;
        uint256 transportdate;
        bool pending;
        bool returned;
        bool confirmed;
        bool produced;
        bool tested;
        bool transported;
        bool recieved;
    }

    event AddOrder(
        uint256 indexed id,
        address owner,
        string product,
        uint256 quantity,
        uint256 orderdate,
        uint256 price,
        string addressLine,
        string contact,
        string city,
        string review,
        string zipcode,
        string state,
        uint256 recievedate,
        uint256 confirmdate,
        uint256 producedate,
        uint256 testdate,
        uint256 transportdate,
        bool pending,
        bool returned,
        bool confirmed,
        bool produced,
        bool tested,
        bool transported,
        bool recieved
    );

    event RoleAdded(string role, address roleaddress);

    //get EthUsd
    function getEthUsd() public view returns (uint256) {
        (, int256 price, , , ) = eth_usd_price_feed.latestRoundData();
        return price.toUint256();
    }

    //convert eth to USD
    function convertEthUsd(uint256 _amountInUsd) public view returns (uint256) {
        uint256 EthUsd = getEthUsd();
        return _amountInUsd.mul(10**16).div(EthUsd);
    }

    //modifier functions

    //add product
    function addProduct(
        string memory _name,
        uint256 _price,
        string memory _imageHash,
        string memory _category,
        uint256 _manufactureDate,
        uint256 _expiryDate
    ) public payable {
        require(bytes(_name).length > 0, "Image name is required");
        require(bytes(_imageHash).length > 0, "Image Hash is required");
        require(_price > 0, " Image price shouldnt be 0");

        productCount++;
        ProductItem storage product = idToProductItem[productCount];
        product.id = productCount;
        product.name = _name;
        product.price = _price;
        product.hash = _imageHash;
        product.category = _category;
        product.manufactureDate = _manufactureDate;
        product.expiryDate = _expiryDate;
    }

    //add role
    function addRole(string memory _role, address _roleaddress) public payable {
        UserRole storage role = roles[_role];
        // require(_roleaddress == role.roleaddress, "Role has been added already");
        rolesCount++;
        role.role = _role;
        role.roleaddress = _roleaddress;
        emit RoleAdded(_role, _roleaddress);
    }

    //validate role
    function validateRole(string memory _role, address _roleaddress)
        public
        view
        returns (bool)
    {
        if (roles[_role].roleaddress == _roleaddress) {
            return true;
        } else {
            return false;
        }
    }

    //add order
    function addOrderItem(
        string memory _product,
        uint256 _quantity,
        string memory _addressline,
        string memory _contact,
        string memory _city,
        string memory _zipcode,
        string memory _state
    ) public payable {
        require(msg.value > 0, "Price must be at least 1 wei");
        require(_quantity > 0, "quantity must be greater than 0");
        require(msg.sender != address(0x0));
        ordersCount++;
        usersCount++;
        OrderItem storage order = orders[ordersCount];
        address payable _owner = companyAddress;
        _owner.transfer(msg.value);
        order.id = ordersCount;
        order.owner = payable(address(msg.sender));
        order.product = _product;
        order.quantity = _quantity;
        order.orderdate = block.timestamp;
        order.price = msg.value;
        order.addressLine = _addressline;
        order.contact = _contact;
        order.city = _city;
        order.review = "";
        order.zipcode = _zipcode;
        order.state = _state;
        order.recievedate = 0;
        order.producedate = 0;
        order.confirmdate = 0;
        order.testdate = 0;
        order.transportdate = 0;
        order.pending = true;
        order.returned = false;
        order.confirmed = false;
        order.produced = false;
        order.tested = false;
        order.transported = false;
        order.recieved = false;

        //  emit AddOrder(ordersCount, msg.sender, _product, _quantity,order.orderdate, msg.value, _addressline, _contact, _city, order.review, _zipcode, _state, order.recievedate, order.confirmdate , order.producedate, order.testdate, order.transportdate, order.pending, order.returned, order.confirmed, order.produced, order.tested, order.transported, order.recieved);
    }

    //confirm order
    function confrimOrder(uint256 _id, string memory _role) public {
        console.log("confirming................");
        require(_id > 0 && _id <= ordersCount, "order id not valid");
        require(
            roles[_role].roleaddress == msg.sender,
            "You dont have permission to confirm order"
        );
        OrderItem storage order = orders[_id];
        require(order.confirmed == false);
        order.confirmed = true;
        order.confirmdate = block.timestamp;
        orders[_id] = order;
    }

    //produced order
    function produceOrder(uint256 _id, string memory _role) public {
        require(_id > 0 && _id <= ordersCount, "order id not valid");
        require(
            roles[_role].roleaddress == msg.sender,
            "You dont have permission to produce order"
        );
        OrderItem storage order = orders[_id];
        require(order.produced == false);
        order.produced = true;
        order.producedate = block.timestamp;
        orders[_id] = order;
    }

    //test order
    function testOrder(uint256 _id, string memory _role) public {
        require(_id > 0 && _id <= ordersCount, "order id not valid");
        require(
            roles[_role].roleaddress == msg.sender,
            "You dont have permission to test order"
        );
        OrderItem storage order = orders[_id];
        require(order.tested == false);
        order.tested = true;
        order.testdate = block.timestamp;
        orders[_id] = order;
    }

    //transported order
    function transportOrder(uint256 _id, string memory _role) public {
        require(_id > 0 && _id <= ordersCount, "order id not valid");
        require(
            roles[_role].roleaddress == msg.sender,
            "You dont have permission to transport order"
        );
        OrderItem storage order = orders[_id];
        require(order.transported == false);
        order.transported = true;
        order.transportdate = block.timestamp;
        orders[_id] = order;
    }

    //add review
    function addReveiw(uint256 _id, string memory _review) public {
        require(_id > 0 && _id <= ordersCount, "order id not valid");
        OrderItem storage order = orders[_id];
        order.review = _review;
        orders[_id] = order;
    }

    ///work on this......
    //return order
    function returnOrder(uint256 _id) public {
        require(_id > 0 && _id <= ordersCount, "order id not valid");
        OrderItem storage order = orders[_id];
        order.returned = true;
        order.confirmed = false;
        order.produced = false;
        order.recieved = false;
        order.tested = false;
        order.transported = false;
        orders[_id] = order;
    }

    //recieved order
    function receiveOrder(uint256 _id) public {
        require(_id > 0 && _id <= ordersCount, "order id not valid");
        OrderItem storage order = orders[_id];
        order.recieved = true;
        order.pending = false;
        orders[_id] = order;
    }

    //get function

    //users get

    //all orders
    function fetchProductItems() public view returns (ProductItem[] memory) {
        uint256 itemCount = productCount;
        uint256 currentIndex = 0;
        ProductItem[] memory items = new ProductItem[](itemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            uint256 currentId = i + 1;
            ProductItem storage currentItem = idToProductItem[currentId];
            items[currentIndex] = currentItem;
            currentIndex += 1;
        }
        return items;
    }

    //my orders
    function fetchMyOrders() public view returns (OrderItem[] memory) {
        uint256 totalItemCount = ordersCount;
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (orders[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        OrderItem[] memory items = new OrderItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (orders[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                OrderItem storage order = orders[currentId];
                items[currentIndex] = order;
                currentIndex += 1;
            }
        }
        return items;
    }

    //all orders
    function fetchOrderItems() public view returns (OrderItem[] memory) {
        uint256 itemCount = ordersCount;
        uint256 currentIndex = 0;
        OrderItem[] memory items = new OrderItem[](itemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            uint256 currentId = i + 1;
            OrderItem storage currentItem = orders[currentId];
            items[currentIndex] = currentItem;
            currentIndex += 1;
        }
        return items;
    }

    //fetch all customers
    function fetchCustomers() public view returns (OrderItem[] memory) {
        uint256 totalItemCount = ordersCount;
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            // if (orders[i + 1].owner != orders[i+1].owner) {
            itemCount += 1;
            // }
        }

        OrderItem[] memory items = new OrderItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (orders[i + 1].owner != orders[i + 1].owner) {
                uint256 currentId = i + 1;
                OrderItem storage order = orders[currentId];
                items[currentIndex] = order;
                currentIndex += 1;
            }
        }
        return items;
    }

    //all orders confirmed
    function fetchOrdersConfirm() public view returns (OrderItem[] memory) {
        uint256 totalItemCount = ordersCount;
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (
                orders[i + 1].confirmed == false &&
                orders[i + 1].produced == false &&
                orders[i + 1].tested == false &&
                orders[i + 1].transported == false
            ) {
                itemCount += 1;
            }
        }

        OrderItem[] memory items = new OrderItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (
                orders[i + 1].confirmed == false &&
                orders[i + 1].produced == false &&
                orders[i + 1].tested == false &&
                orders[i + 1].transported == false
            ) {
                uint256 currentId = i + 1;
                OrderItem storage order = orders[currentId];
                items[currentIndex] = order;
                currentIndex += 1;
            }
        }
        return items;
    }

    //fetch orders produced
    function fetchOrdersProduced() public view returns (OrderItem[] memory) {
        uint256 totalItemCount = ordersCount;
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (
                orders[i + 1].confirmed == true &&
                orders[i + 1].produced == false &&
                orders[i + 1].tested == false &&
                orders[i + 1].transported == false
            ) {
                itemCount += 1;
            }
        }

        OrderItem[] memory items = new OrderItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (
                orders[i + 1].confirmed == true &&
                orders[i + 1].produced == false &&
                orders[i + 1].tested == false &&
                orders[i + 1].transported == false
            ) {
                uint256 currentId = i + 1;
                OrderItem storage order = orders[currentId];
                items[currentIndex] = order;
                currentIndex += 1;
            }
        }
        return items;
    }

    //fetch orders tested
    function fetchOrdersTested() public view returns (OrderItem[] memory) {
        uint256 totalItemCount = ordersCount;
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (
                orders[i + 1].confirmed == true &&
                orders[i + 1].produced == true &&
                orders[i + 1].tested == false &&
                orders[i + 1].transported == false
            ) {
                itemCount += 1;
            }
        }

        OrderItem[] memory items = new OrderItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (
                orders[i + 1].confirmed == true &&
                orders[i + 1].produced == true &&
                orders[i + 1].tested == false &&
                orders[i + 1].transported == false
            ) {
                uint256 currentId = i + 1;
                OrderItem storage order = orders[currentId];
                items[currentIndex] = order;
                currentIndex += 1;
            }
        }
        return items;
    }

    //fetch orders transported
    function fetchOrdersTransported() public view returns (OrderItem[] memory) {
        uint256 totalItemCount = ordersCount;
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (
                orders[i + 1].confirmed == true &&
                orders[i + 1].produced == true &&
                orders[i + 1].tested == true &&
                orders[i + 1].transported == false
            ) {
                itemCount += 1;
            }
        }

        OrderItem[] memory items = new OrderItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (
                orders[i + 1].confirmed == true &&
                orders[i + 1].produced == true &&
                orders[i + 1].tested == true &&
                orders[i + 1].transported == false
            ) {
                uint256 currentId = i + 1;
                OrderItem storage order = orders[currentId];
                items[currentIndex] = order;
                currentIndex += 1;
            }
        }
        return items;
    }
}
