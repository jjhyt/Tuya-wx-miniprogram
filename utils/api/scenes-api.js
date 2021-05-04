//添加场景
export const scenesAdd = (home_id, name, background, actions) => {
  return wx.cloud.callFunction({
    name: 'ty-service',
    data: {
      "action": "scenes.add",
      "params": {
        "home_id":home_id,
        "name":name,
        "background":background,
        "actions":actions
      }
    }
  })
}

//修改场景
export const scenesEdit = (home_id, scene_id, name, background, actions) => {
  return wx.cloud.callFunction({
    name: 'ty-service',
    data: {
      "action": "scenes.edit",
      "params": {
        "home_id":home_id,
        "scene_id":scene_id,
        "name":name,
        "background":background,
        "actions":actions
      }
    }
  })
}

//删除场景
export const scenesDelete = (home_id, scene_id) => {
  return wx.cloud.callFunction({
    name: 'ty-service',
    data: {
      "action": "scenes.delete",
      "params": {
        "home_id":home_id,
        "scene_id":scene_id
      }
    }
  })
}

//执行某个场景
export const scenesTrigger = (home_id, scene_id) => {
  return wx.cloud.callFunction({
    name: 'ty-service',
    data: {
      "action": "scenes.trigger",
      "params": {
        "home_id":home_id,
        "scene_id":scene_id
      }
    }
  })
}

//查询家庭下场景列表
export const scenesInfos = (home_id) => {
  return wx.cloud.callFunction({
    name: 'ty-service',
    data: {
      "action": "scenes.infos",
      "params": {
        "home_id": home_id
      }
    }
  })
}

//查询场景图片列表
export const scenesPictures = () => {
  return wx.cloud.callFunction({
    name: 'ty-service',
    data: {
      "action": "scenes.default-pictures"
    }
  })
}

//获取设备支持的指令集和状态集
export const deviceSpec = (device_id) => {
  return wx.cloud.callFunction({
    name: 'ty-service',
    data: {
      "action": "device.specifications",
      "params": {
        "device_id":device_id
      }
    }
  })
}