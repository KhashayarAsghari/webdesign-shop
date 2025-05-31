function fetchFn() {
    const request = fetch("https://fakestoreapi.com/products/category/jewelery")
        .then(res => res.json())
        .then(json => json)
        .catch(err => err)

    return request
}


async function testFn() {
    const test = await fetchFn()
    console.log(test)
}

testFn()