import request from '../request'

// 获取用户所有家庭信息
export const getFamilyList = () => {
  return request({
    name: 'ty-service',
    data: {
      action: 'home.memberHomeList',
      params: {}
    }
  })
}

// 获取当前家庭下的设备情况
export const getHomeDeviceList = (home_id) => {
  return request({
    name: 'ty-service',
    data: {
      action: 'home.devices',
      params: {
        home_id
      }
    }
  });
}

// 修改家庭信息
export const changFamily = (home_id, homeName) => {
  return request({
    name: 'ty-service',
    data: {
      action: 'home.edit',
      params: {
        home_id,
        name: homeName
      }
    }
  });
}

// 添加家庭
export const addFamily = (homeName) => {
  return request({
    name: 'ty-service',
    data: {
      action: 'home.add',
      params: {

        "home": {
          "name": homeName
        }
      }
    }
  })
}

// 删除家庭
export const deleteFamily = (home_id) => {
  return request({
    name: 'ty-service',
    data: {
      action: 'home.delete',
      params: {
        home_id
      }
    }
  })
}

// 查询家庭成员
export const getMemberList = (home_id) => {
  return request({
    name: 'ty-service',
    data: {
      action: 'home.memberList',
      params: {
        "home_id":home_id
      }
    }
  })
}

// 增加家庭成员
export const addMember = (home_id, member_account, admin, name) => {
  return request({
    name: 'ty-service',
    data: {
      action: 'home.addMember',
      params: {
        "home_id":home_id,
        "schema":"cloud",
        "member":{
          "country_code":"86",
          "member_account":member_account,
          "admin":admin,
          "name":name
    }
      }
    }
  })
}

// 删除家庭成员
export const deleteMember = (home_id, uid) => {
  return request({
    name: 'ty-service',
    data: {
      action: 'home.deleteMember',
      params: {
        "home_id":home_id,
        "uid":uid
      }
    }
  })
}

// 生成分享票据
export const getHomeTicket = (home_id, uid) => {
  return request({
    name: 'ty-service',
    data: {
      action: "sharing.homeTicket",
      params: {
        "app_schema": "cloud",
        "home_id": home_id,
        "sharer": uid
      }
    }
  })
}

// 确认加入分享
export const homeConfirm = (sharing_id, sharing_ticket, receiver) => {
  return request({
    name: 'ty-service',
    data: {
      action: 'sharing.homeConfirm',
      params: {
        "sharing_id": sharing_id,
        "sharing_ticket": sharing_ticket,
        "receiver": receiver,
        "app_schema": "cloud"
      }
    }
  })
}

// 分享票据校验
export const checkHomeTicket = (sharing_ticket) => {
  return request({
    name: 'ty-service',
    data: {
      action: 'sharing.homeTicketVerification',
      params: {
        "sharing_ticket": sharing_ticket
      }
    }
  })
}

// 根据家庭ID查询家庭和房间信息
export const getRoomList = (home_id) => {
  return request({
    name: 'ty-service',
    data: {
      action: 'home.roomInfos',
      params: {
        "home_id": home_id
      }
    }
  })
}

// 根据家庭ID添加房间
export const addRoom = (home_id, name) => {
  return request({
    name: 'ty-service',
    data: {
      action: 'home.addRoom',
	    params: {
		    "home_id": home_id,
        "name": name
	    }
    }
  })
}

// 修改房间名称
export const changRoom = (home_id, room_id, name) => {
  return request({
    name: 'ty-service',
    data: {
      action: 'home.editRoom',
	    params: {
        "home_id": home_id,
        "room_id": room_id,
        "name": name
	    }
    }
  })
}

// 删除房间
export const deleteRoom = (home_id, room_id) => {
  return request({
    name: 'ty-service',
    data: {
      action: 'home.deleteRoom',
	    params: {
        "home_id": home_id,
        "room_id": room_id
	    }
    }
  })
}