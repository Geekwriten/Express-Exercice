const express = require('express');
const router = express.Router();
const members = require('../../members');
const uuid = require('uuid');


// Gets all members
router.get("/", (req,res) => {
    res.json(members);
});

// Get single member
router.get('/:id', (req,res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found) {
    res.json(members.filter(members => members.id === parseInt(req.params.id)));
} else {
    res.status(400).json({msg:`No members  ${req.params.id} found `});
}
});

// Create Member
router.post('/', (req,res) => {
    const newMember = {
        id: uuid.v4,
        name:req.body.name,
        email: req.body.email,
        status: 'active'

    }

    if(!newMember.name || !newMember.email) {
      return res.status(400).json({ msg: 'Please include a name and email'});
    }

    members.push(newMember);
    res.json(members);
    // res.redirect("/");
});
//Update a member 
router.put('/:id', (req,res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
    const updMember = req.body;
    members.forEach(member => {
        if(member.id === parseInt(req.params.id)) {
            member.name = updMember.name ? updMember.name:member.name;
            member.email = updMember.email ? updMember.email:member.email;

            res.json({msg : 'Member updated', member});
        }
    } );
} else {
    res.status(400).json({msg:`No members  ${req.params.id} found `});
}
});

// Delete a member
router.delete('/:id', (req,res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found) {
    res.json({msg : 'Member deleted' , member : members.filter(member => members.id !== parseInt(req.params.id))});
} else {
    res.status(400).json({msg:`No members  ${req.params.id} found `});
}
});

module.exports = router;