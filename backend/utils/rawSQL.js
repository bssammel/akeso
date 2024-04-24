//!Raw SQL query used to try to debug on prod. 
 
 // const newPatient = await sequelize.query(sql`INSERT INTO patients (userId, dob, sex, gender, insurance, religion, relationshipStatus, language, ethnicity, street, city, state, name911, phone911, street911, city911, state911, relationship911, pharmName, pharmStreet, pharmCity, pharmState) VALUES (${userId},${dob},${sex},${gender},${insurance},${religion},${relationshipStatus},${language},${ethnicity},${street},${city},${state},${name911},${phone911},${street911},${city911},${state911},${relationship911},${pharmName},${pharmStreet},${pharmCity},${pharmState})`)

        // const newPatient = await db.sequelize.query(`INSERT INTO ${patientTableName} (userId, dob, sex, gender, insurance, religion, relationshipStatus, language, ethnicity, street, city, state, name911, phone911, street911, city911, state911, relationship911, pharmName, pharmStreet, pharmCity, pharmState) VALUES (${userId},${dob},"${sex}","${gender}","${insurance}","${religion}","${relationshipStatus}","${language}","${ethnicity}","${street}","${city}","${state}","${name911}",${phone911},"${street911}","${city911}","${state911}","${relationship911}","${pharmName}","${pharmStreet}","${pharmCity}","${pharmState}")`, {
        //     type: QueryTypes.INSERT,
        // });

        // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        // console.log(newPatient)
        // console.log(newPatient[0])
        // const newPtId = newPatient[0];
        
        // const ptObj = await Patient.findOne({
        //     where: {
        //         id: newPtId
        //     },
        //     // include: [
        //     //     {
        //     //         model: User,
        //     //         attributes: [ 
        //     //             "firstName", "lastName", "email", "phone"
        //     //         ],
        //     //     }
        //     // ],
        //     attributes: [
        //         'id', 'userId', 'sex', 'gender', 'insurance', 'religion','relationshipStatus','language', 'ethnicity','street', 'city','state','name911','phone911','street911','city911','state911','relationship911','pharmName','pharmStreet','pharmCity','pharmState'
        //     ],
            
        // })

        // return res.status(201).json(ptObj)
