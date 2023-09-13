# TEMPLATE GOOD RESPOMSE

## 200:

res.json({ code: 200 , status: "OK", message: "Success Get Data",success: true, data: users });

## 200(With Pagination):

res.json({ code: 200 , status: "OK", message: "Success Get Data",success: true, data: users, page: { size: size , page: page, totalPages: getCourses.length } });

## 201

res.status(201).json({ code : 201, status: "Created" , message: "User Register Successfully",success: true, data: users });

## 204

res.json({ code: 204 , status: "No Content", message: "No Content",success: true });

## 400

res.status(400).json({ code:400, status: "Bad Request" ,message:"Wrong Password", success: false, errors: });

## 401

res.status(401).json({code:401 ,status: "Unauthorized",message:"Session has Expired", success: false});

## 403

res.status(403).json({code:403 ,status: "Forbidden", message:"Forbidden", success: false});

## 404

res.status(404).json({code:404 ,status: "Not Found",message:"User Not Found", success: false});

## 500

res.status(500).json({code:500 ,status: "Internal Server Error",message:"Internal Server Error", errors: { error }});
