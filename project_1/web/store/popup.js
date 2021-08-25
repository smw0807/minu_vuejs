export const state = () => {
  return {

  }
}

export const mutations = {

}

export const getters = {

}

export const actions = {
  test() {
    return new Promise ( (resolve, reject) => {
      console.log('store/test!!');
    })
  }
}