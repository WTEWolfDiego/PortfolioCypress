import "cypress-xpath"
import "cypress-real-events"
////////////////////////////////////////////////////////////////////////////////////////////////
//Variables and constants block
const automotores_url="https://frontend.wildar.dev/Autos";
const pageTitleLoc = "//div/h1";
const pageSndTitleLoc="//div/p";
const buscar_btn="//div/button[@type='submit']";
const marca_input="//div/input[@id='marca']";
const modelo_input="//div/input[@id='modelo']";
const anio_input="//div/input[@id='anio']";
const precioMin_input="//div/input[@id='precioMin']";
const precioMax_input="//div/input[@id='precioMax']";
const estado_select = "//div/select[@id='estado']";
const resultadoGrilla_loc = "//div[@class='alert alert-info']";
const limpiar_btn="//div/a[@class='btn btn-secondary']";
const table_class="table tbody tr";
const colorEd_input="//div/input[@id='Color']";
const guardar_btn="//div/input[@type='submit']";
const marcaEd_input="//div/input[@id='Marca']";
const modeloEd_input="//div/input[@id='Modelo']";
const anioEd_input="//div/input[@id='Anio']";
const precioEd_input="//div/input[@id='Precio']";
const estadoEd_select="//div/select[@id='Estado']";
const registrarNuevoAuto_btn="//div/a[@href='/Autos/Crear']";
const numeroChasis="//div/input[@id='NumeroChasis']";
const crear_btn="//div/input[@type='submit']";
const eliminar_btn="//div/form/input[@type='submit']";
/////////////////////////////////////////////////////////////////////////////////////////////////
//Text variables
const pageTitle_text = "Registro de Automóviles";
const pageSndTitle_text="Bienvenido al sistema de registro de automóviles."
/////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////

describe ("Test set: Automotores" , ()=>{

    beforeEach(()=>{

        cy.preparingForTesting(automotores_url);
        
    })

    //////////////////////////////////////////////////////////////////////////////////////
    //Test 1: Checking page text and titles                                             //  
    //Block #1                                                                          //
    //////////////////////////////////////////////////////////////////////////////////////
    it("Test 1: Checking page text and titles", ()=>{

        cy.verifyTexts(pageTitleLoc,pageTitle_text);
        cy.title().should('contains','Registro de Automóviles - Registro de Automóviles');
        cy.verifyTexts(pageSndTitleLoc,pageSndTitle_text);
        cy.wait(2000);
        cy.log("Test #1: Checking page text and titles --- Passed");

    })

    ///////////////////////////////////////////////////////////////////////////////////////
    //Test 2: Making a search without adding any parameters                              //
    ///////////////////////////////////////////////////////////////////////////////////////
    it("Test 2: Making a search without adding any parameters", ()=>{

        cy.wait(2000);
        cy.xpath(buscar_btn).should('be.visible').click();
        cy.wait(2000);
        cy.log("Test #2: Making a search without adding any parameters --- Passed");

    })

    ///////////////////////////////////////////////////////////////////////////////////////
    //Test 3: Filtering an inexisting search                                             //
    //Block #3                                                                           //
    ///////////////////////////////////////////////////////////////////////////////////////
    it("Test 3: Filtering an inexisting search", ()=>{

        cy.xpath(marca_input).should('be.visible').type('autonoexistente');
        cy.xpath(modelo_input).should('be.visible').type('modelonoexiste');
        cy.xpath(anio_input).should('be.visible').type('1990');
        cy.xpath(precioMin_input).should('be.visible').type('30.000');
        cy.xpath(precioMax_input).should('be.visible').type('80.000');
        cy.xpath(estado_select).should('be.visible').select('Todos');
        cy.xpath(buscar_btn).should('be.visible').click()
        cy.wait(2000);
        cy.xpath(resultadoGrilla_loc).contains('No se encontraron resultados para la búsqueda especificada.');      
        cy.wait(2000);
        cy.log("Test 3: Filtering an inexisting search --- Passed")

    })

    ///////////////////////////////////////////////////////////////////////////////////////
    //Test 4: cleaning the filters                                                       //
    //Block #4                                                                           //
    ///////////////////////////////////////////////////////////////////////////////////////
    it("Test 4: Cleaning the filters", ()=>{

        cy.xpath(limpiar_btn).should('be.visible').click();      
        cy.wait(2000);
        cy.log("Test 4: Cleaning the filters --- Passed")

    })

    ///////////////////////////////////////////////////////////////////////////////////////
    //Test 5: Filtering an existing search                                               //
    //Block #5                                                                           //
    ///////////////////////////////////////////////////////////////////////////////////////
    it("Test 5: Filtering an existing search", ()=>{

        cy.xpath(marca_input).should('be.visible').type('Volkswagen');
        cy.xpath(modelo_input).should('be.visible').type('Gol');
        cy.xpath(anio_input).should('be.visible').type('2009');
        cy.xpath(precioMin_input).should('be.visible').type('30.000');
        cy.wait(2000);
        cy.xpath(buscar_btn).should('be.visible').click()
        cy.get(table_class).should('have.length.greaterThan', 0);
        cy.get(table_class).first().within(()=>{
            cy.get('td').eq(0).invoke('text').then((marca)=>{
                cy.log("Marca: " + marca);
                expect(marca).to.include('Volkswagen');
            })
            cy.get('td').eq(1).invoke('text').then((modelo)=>{
                cy.log("Modelo: " + modelo);
                expect(modelo).to.include('Gol');
            })
            cy.get('td').eq(2).invoke('text').then((chasis)=>{
                cy.log("chasis" + chasis);
                expect(chasis).to.include('12345678910111214');
            })
            cy.get('td').eq(3).invoke('text').then((anio)=>{
                cy.log("Año: " + anio);
                expect(anio).to.include("2009");
            })
            cy.get('td').eq(4).invoke('text').then((color)=>{
                cy.log("Color: " + color);
                expect(color).to.include("Gris");
            })
            cy.get('td').eq(5).invoke('text').then((estado)=>{
                cy.log("Estado: " + estado);
                expect(estado).to.include('Usado');
            })
            cy.get('td').eq(6).invoke('text').then((precioAuto)=>{
                cy.log("Precio: " + precioAuto);
                expect(precioAuto).to.include('$30,000.00');
            })

        })
        cy.wait(2000);
        cy.log("Test 5: Filtering an existing search --- Passed");
    })
    ///////////////////////////////////////////////////////////////////////////////////////
    //Test 6: Accessing to Car details                                                   //
    //Block #6                                                                           //
    ///////////////////////////////////////////////////////////////////////////////////////
    it("Test 6: Accessing to Car details", ()=>{

        cy.get(table_class).contains('Detalles').click();
        cy.wait(2000);
        cy.log("Clicking on 'Detalles' button --- Passed");

    })

    ///////////////////////////////////////////////////////////////////////////////////////
    //Test 7: Editing the car information                                                //
    //Block #7                                                                           //
    ///////////////////////////////////////////////////////////////////////////////////////
    it("Test 7: Editing the car information", ()=>{

        cy.get(table_class).contains('Editar').click();
        cy.wait(2000);
        cy.xpath(marcaEd_input).should('be.visible').clear().type('Porsche');
        cy.xpath(modeloEd_input).should('be.visible').clear().type('1911');
        cy.xpath(anioEd_input).should('be.visible').clear().type('2000');
        cy.xpath(precioEd_input).should('be.visible').clear().type("800000");
        cy.xpath(colorEd_input).should('be.visible').clear().type("Verde");
        cy.xpath(estadoEd_select).should('be.visible').select('Usado');
        cy.wait(2000);
        cy.xpath(guardar_btn).should('be.visible').click();

        //Returning the values back to normal
        /////////////////////////////////////////////////////////////////////
        cy.get(table_class).contains('Editar').click();
        cy.wait(2000);
        cy.xpath(marcaEd_input).should('be.visible').clear().type('Volkswagen');
        cy.xpath(modeloEd_input).should('be.visible').clear().type('Gol');
        cy.xpath(anioEd_input).should('be.visible').clear().type('2009');
        cy.xpath(precioEd_input).should('be.visible').clear().type("30000");
        cy.xpath(colorEd_input).should('be.visible').clear().type("Gris");
        cy.xpath(estadoEd_select).should('be.visible').select('Usado');
        cy.wait(2000);
        cy.xpath(guardar_btn).should('be.visible').click();
        cy.wait(2000);
        cy.log("Test 7: Editing the car information --- Passed");

    })

    ///////////////////////////////////////////////////////////////////////////////////////
    //Test 8: Creating a new car                                                         //
    //Block #8                                                                           //
    ///////////////////////////////////////////////////////////////////////////////////////
    it("Test 8: Creating a new car", ()=>{

        cy.xpath(registrarNuevoAuto_btn).should('be.visible').click()
        cy.wait(2000);
        cy.xpath(marcaEd_input).should('be.visible').type('Chevrolet');
        cy.xpath(modeloEd_input).should('be.visible').type('Corsa');
        cy.xpath(numeroChasis).should('be.visible').type('12345678901234567');
        cy.xpath(anioEd_input).should('be.visible').type('1995');
        cy.xpath(precioEd_input).should('be.visible').type('40000');
        cy.xpath(colorEd_input).should('be.visible').type('Azul');
        cy.xpath(estadoEd_select).should('be.visible').select('Usado');
        cy.wait(2000);
        cy.xpath(crear_btn).should('be.visible').click();
        cy.wait(2000);
        cy.log("Test 8: Creating a new car --- Passed");

    })
    ///////////////////////////////////////////////////////////////////////////////////////
    //Test 9: Deleting an existing car                                                   //
    //Block #9                                                                           //
    ///////////////////////////////////////////////////////////////////////////////////////
    it("Test 9: Deleting an existing car", ()=>{

        cy.get(table_class).eq(1).contains('Eliminar').click();
        cy.wait(2000);
        cy.xpath(eliminar_btn).click();
        cy.wait(2000);
        cy.log("Test 9: Deleting an existing car --- Passed");

    })

})


