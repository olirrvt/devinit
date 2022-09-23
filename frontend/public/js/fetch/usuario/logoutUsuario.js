async function logout(){
    const id = localStorage.getItem("user_id")
    console.log(id)
    const url = `http://localhost:3020/logout/${id}`
    await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({})
    })
    .then(res => res.json())
    .then(res => {
   console.log(res)
   window.location.href="http://localhost:4020/"
    })
    .catch(res => console.log(res))
}
