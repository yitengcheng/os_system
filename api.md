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

# 级别
1. getPositions(post) 获取级别
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

2. applyForLeave(post) 申请离职
    参数：targetId
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

5. postAdjustment(post) 调整人员岗位
    参数：targetId, branchId, positionId
    返回：res.json({
            success: true
        })

6. confirmLeave(post) 确认离职
    参数：targetId
    返回：res.json({
            success: true
        })

7. getPersonsForBranch(post) 根据部门获取人员列表
    参数：branchId
    返回：res.json({
            success: true,
            persons: [
                {
                    "name": String
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

3. reviewThePost(post) 审核同意
    参数：userId, profileId
    返回：res.json({
            success: true
        })

4. getPendingProfiles() 获取待审核文件列表
    参数：pageNo, pageSize, userId
    返回：res.json({
            success: true,
            fileList: [
                {
                    title: String,          // 标题
                    desc: String,           // 内容
                    filePath: Array,        // 附件路径
                    author: String,         // 作者
                    profileId: String       // 文件编号
                }
            ]
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

4. confirmAfterUse(post) 确认会议室使用完毕
    参数: roomId
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

3. bookingOfVehicles(post) 添加车辆预约
    参数: carId, application, serviceTime
    返回：res.json({
            success: true
        })

4. confirmMileage(post) 确认车辆里程数
    参数: recordId, startingKm, endingKm
    返回：res.json({
            success: true
        })

# 文件交换
1. sendToUser(post) 发送文件给同事
    参数: filePath, toUserId, userId, title, desc
    返回：res.json({
            success: true
        })

2. getFileExchanges(post) 获取别人发送给你的文件列表
    参数: userId
    返回：res.json({
            success: true,
            FileExchangeList: [
                {
                    title: String,
                    desc: String,
                    initiator: String,
                    filePath: Array
                }
            ]
        })

# 日程安排
1. addSchedule(post) 添加日程
    参数: userId, date, desc
    返回：res.json({
            success: true
        })

2. getSchedule(post) 获取日程安排
    参数: userId
    返回：res.json({
            success: true,
            scheduleList:[
                {
                    date:String,
                    desc:String
                }
            ]
        })

3. updateSchedule(post) 修改日程安排
    参数: userId, date, time, desc
    返回：res.json({
            success: true
        })

# 个人通讯录
1. addAddressBook(post) 添加通讯录信息
    参数: userId, name, phone, company
    返回：res.json({
            success: true
        })

2. getAddressBook(post) 获取个人通讯录
    参数: userId
    返回：res.json({
            success: true,
            addressBookList:[{
                name: String,
                phone: String,
                company: String,
                createTime: String
            }]
        })

3. removeAddressBook(post) 删除通讯录
    参数: userId, addressBookId
    返回：res.json({
            success: true
        })

4. updateAddressBook(post) 修改通讯录
    参数: userId, addressBookId, name, phone, company
    返回：res.json({
            success: true
        })

# 密码管理
1. addPassword(post) 添加密码信息
    参数: desc, accountNumber, accountPassword, userId
    返回：res.json({
            success: true
        })

2. removePassword(post) 删除密码信息
    参数: userId, accountId
    返回：res.json({
            success: true
        })

3. updatePassword(post) 修改密码信息
    参数: userId, accountId
    返回：res.json({
            success: true
        })

4. getPassword(post) 获取密码列表
    参数: userId
    返回：res.json({
            success: true,
            passwordList: [{
                desc: String,
                accountNumber: String,
                accountPassword: String,
                createTime: String
            }]
        })

# 考勤
1. uploadAttendance(post) 上传考勤
    参数: date, file 
    返回：res.json({
            success: true
        })

2. getAttendance(post) 获取个人考勤
    参数: date, userId 
    返回：res.json({
            success: true,
            clockInList:[
                {
                    date:String,
                    clockIn: [
                        String,
                        String
                    ]
                }
            ]
        })