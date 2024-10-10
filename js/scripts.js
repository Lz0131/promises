$(document).ready(()=>{
    $('#btn1').click(()=>{
        let promise = new Promise((resolve, reject)=>{
            setTimeout(()=>{
                //resolve("Promise completed succesfully...")
                reject("Promise Failed")
            },2000)
        })
        promise.then((result)=>{
            alert(result)
            console.log(result)
        }).catch((error)=>alert(error))
    });
    $('#btn2').click(()=>{
        let promise = new Promise((resolve, reject)=>{
            setTimeout(()=>{
                resolve("Hola")
                //reject("Promise Failed")
            },1000)
        }).then((result)=>{
            return result + " a todos"
        }).then((result)=>{
            return result + " gusto en saludarles"
        }).then((result)=>{
            alert(result)
        })
    });
    $('#btn3').click(()=>{
        new Promise((resolve, reject)=>{
            $.getJSON('http://localhost:3000/api/v1/employees', (results)=>{
                resolve(results)
            }).fail((error)=>{
                reject(error)
            })
        }).then((results)=>{
            console.table(results)
            $.each(results, (i, emp)=>{
                $('#tblEmployees > tbody:last-child').append(
                    "<tr>" +
                    "<td>" + emp.cve_emp + "</td>" +
                    "<td>" + emp.first_name + " " + emp.last_name + "</td>" +
                    "<td>" + emp.salary + "</td>" +
                    "</tr>"
                )
            })
        }).catch((error)=>console.error(error))
    });
    $('#btn4').click( async()=>{
        /*fetch('http://localhost:3000/api/v1/employees/gender/Female/department/Marketing')
        .then((responce)=>responce.json())
        .then((results)=>{
            console.table(results)
            fillTable(results)
        }).catch((error)=>console.error(error)) */
        let response = await fetch('http://localhost:3000/api/v1/employees/gender/Female/department/Marketing')
        const results = await response.json()
        fillTable(results)
    });

    function fillTable(results) {
        $.each(results, (i, emp)=>{
            $('#tblEmployees > tbody:last-child').append(
                "<tr>" +
                "<td>" + emp.cve_emp + "</td>" +
                "<td>" + emp.first_name + " " + emp.last_name + "</td>" +
                "<td>" + emp.salary + "</td>" +
                "</tr>"
            )
        })
    }
})