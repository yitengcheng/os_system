# 部门
1. getBranchs(post) 获取部门
    参数：无
    返回：res.json({
            success: true,
            branchs: [
                {
                    "name": String,"_id":ObjectId
                }
            ]
        })

# 职位
1. getPositions(post) 获取职位
    参数：无
    返回：res.json({
            success: true,
            positions: [
                {
                    "position": String,"_id":ObjectId
                }
            ]
        })

# 登录
1. login(post) 登录
    参数：userName, password
    返回：res.json({
            success: true,
            user:{
                "name": String,
                "branch": {
                    "name": String,"_id":ObjectId
                },
                "position": {
                    "position": String,"_id":ObjectId
                },
                "userName": String,
                "password": String,
                "createTime": String,
                "birthday": String,
                "sex": String,
                "phone": String,
                "email": String,
                "head": String,
                "permissions": Array
            }
        })

# 人员信息
1. addPerson(post) 添加人员
    参数：user{
            name,
            branch,
            position,
            userName,
            password,
            birthday,
            sex,
            phone,
            email
        }
    返回：res.json({
            success: true
        })

2. deletePerson(post) 删除人员
    参数：id
    返回：res.json({
             success: true
        })

3. getPersons(post) 获取人员列表
    参数：无
    返回：res.json({
            success: true,
            persons: [
                {
                    "name": String,
                    "branch": {
                        "name": String,
                        "_id":ObjectId
                    },
                    "position": {
                        "position": String,
                        "_id":ObjectId
                    },
                    "userName": String,
                    "createTime": String,
                    "birthday": String,
                    "sex": String,
                    "phone": String,
                    "email": String,
                    "head": String,
                    "permissions": Array
                }
            ]
        })

4. getPublicAddressBook(post) 获取公共通讯录
    参数：pageNo, pageSize
    返回：res.json({
            success: true,
            persons: [
                {
                    "branch": String
                    "position": String,
                    "name": String,
                    "phone": String
                }
            ]
        })

5. updatePerson(post) 修改人员信息
    参数：user{
            name,
            branch,
            position,
            userName,
            password,
            birthday,
            sex,
            phone,
            email
        }
    返回：res.json({
            success: true,
            persons: [
                {
                    "name": String,
                    "branch": {
                        "name": String,
                        "_id":ObjectId
                    },
                    "position": {
                        "position": String,
                        "_id":ObjectId
                    },
                    "userName": String,
                    "createTime": String,
                    "birthday": String,
                    "sex": String,
                    "phone": String,
                    "email": String,
                    "head": String,
                    "permissions": Array
                }
            ]
        })

# 公司发文
1. getProfiles(post) 获取公司发文列表
    参数：pageNo, pageSize
    返回：res.json({
            success: true,
            fileList: [{
                title: String,
                desc: String,
                filePath: String,
                author: String
            }]
        })

2. profileRelease(post) 公司发文
    参数：userId, profile:{
            title,
            desc,
            filePath,
            checkLevel,
            copyTo
        }
    返回：res.json({
            success: true
        })

# 公告信息
1. getNewInformation(post) 获取最新公告
    参数：无
    返回：res.json({
            success: true,
            information:{
                "title": String,
                "desc": String,
                "createTime": String,
                "author": String
            }
        })

2. informationIssue(post) 发布公告信息
    参数：userId,information{
            title,
            desc,
        }
    返回：res.json({
            success: true
        })

# 留言板
1. addMessage(post) 添加留言
    参数：userId,message
    返回：res.json({
            success: true
        })

2. getMessage(post) 获取留言
    参数：无
    返回：res.json({
            success: true,
            messageList: [
                "message":String
            ]
        })

# 办公用品管理
1. addStationery(post) 办公用品入库
    参数：stationery{
            name,
            category,
            number,
            unit
        }
    返回：res.json({
            success: true
        })

2. addStationeryRecord(post) 领取办公用品
    参数：stationeryId, receiveNumber, receiverId, remark
    返回：res.json({
            success: true
        })

3. getStationery(post) 获取库存中办公用品数量
    参数：pageNo, pageSize, category, name
    返回：res.json({
            success: true,
            stationeryList: [
                {
                    name: String,
                    category: String,
                    number: Number,
                    unit: String
                }
            ]
        })

4. getStationeryRecord(post) 获取办公用品领取记录
    参数: pageNo, pageSize, category, name
    返回：res.json({
            success: true,
            recordList:[
                {
                    receiveTime: String,
                    receiver: String,
                    receiveBranch: String,
                    receiveNumber: Number,
                    remark: String
                }
            ]
        })

# 会议室管理
1. getConferenceRooms(post) 获取会议室列表
    参数: 无
    返回：res.json({
            success: true,
            conferenceRoomList:[
                {
                    name: String,
                    area: String,
                    roomNumber: String,
                    galleryful: Number,
                    roomStatus: String,
                    appointmentTime: String
                }
            ]
        })

2. addConferenceRoom(post) 添加会议室
    参数: room{
        name: String,
        area: String,
        roomNumber: String,
        galleryful: Number
    }
    返回：res.json({
            success: true
        })

3. subscribeConferenceRoom(post) 预约使用会议室
    参数: roomId, appointmentTime
    返回：res.json({
            success: true
        })

# 车辆管理
1. addCar(post) 添加车辆
    参数: car{
        carOwner：车主id,
        carModel,
        plate,
    }
    返回：res.json({
            success: true
        })

2. getCars(post) 获取车辆
    参数: 无
    返回：res.json({
            success: true,
            carList:[
                {
                    carOwner: String,
                    plate: String,
                    carId: String
                }
            ]
        })

3. addCarRecord(post) 添加车辆预约
    参数: carId, application, serviceTime
    返回：res.json({
            success: true
        })

4. confirmMileage(post) 确认车辆里程数
    参数: recordId, startingKm, endingKm
    返回：res.json({
            success: true
        })