const { v4: uuidv4 } = require('uuid');
const { clients } = require('../data/clients');

// write your handlers here...
const handleClients = (req, res)=>{ 
    res.status(200).json({ status: 200, data: [...clients ] });  
};

const handleClient = (req, res)=>{  
    const theClient = clients.find((client)=>{ 
        return client.id === req.params.id;
    });

    if (theClient !== undefined)
        res.status(200).json({ status: 200, data: theClient });
    else 
        res.status(404).json({ status: 404, message: "Client not found" });
};

const handleCreatesClient = (req, res)=>{      
    const alreadyExist = clients.filter((client)=>{ 
        return client.email.toLowerCase() === req.body.email.toLowerCase();
    });   

    const isEmailValid = /(.+)@(.+){2,}\.(.+){2,}/.test(req.body.email);
     
    if (alreadyExist.length !== 0) {
        res.status(404).json({ 
            status: 404,
            message: "Client already in the database"
        })
    }
    else if (!isEmailValid) {
        res.status(400).json({ 
            status: 400,
            message: "Invalid email"
        })
    }
    else {
        const newClient = {...req.body};
        newClient.id = uuidv4();
        clients.push(newClient);
        res.status(201).json({
            status: 201,  
            data: "Client added to the database"       
         }); 
    }        
         
};

const handleDeleteClient = (req, res)=>{ 
    const removeIndex = clients.findIndex((client)=>{ 
        return client.id === req.params.id;
    });

    if (removeIndex === -1) {
        res.status(404).json({ 
            status: 404,
            message: "Client not found"
        })
    }
    else {       
        clients.splice(removeIndex, 1);
        res.status(200).json({
            status: 20,  
            data: "The client was deleted"       
         }); 
    }        
};

module.exports = { handleClients, handleClient, handleCreatesClient, handleDeleteClient };