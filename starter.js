var penguinPromise = d3.json("classData.json");
    
    var successFCN = function(penguins)
        {
            console.log("Here are the penguins", penguins);
            sortPenguins(penguins);
            drawTable(penguins);
        }
    var failureFCN = function(penguins)
        {
            console.log("Error", penguins);
        }

penguinPromise.then(successFCN, failureFCN);

var quizMean = function(penguin)
    {
        var getGradeQ = function(quiz)
            {
                return quiz.grade
            }
        var quizGrade = penguin.quizes.map(getGradeQ)
        return d3.mean(quizGrade)
    }

var homeworkMean = function(penguin)
    {
        var getGradeHW = function(homework)
            {
                return homework.grade
            }
        var homeworkGrade = penguin.homework.map(getGradeHW)
        return d3.mean(homeworkGrade)
    }

var testMean = function(penguin)
    {
        var getTestGrade = function(test)
            {
                return test.grade
            }
        var testGrade = penguin.test.map(getTestGrade)
        return d3.mean(testGrade)
    }

var drawTable = function(penguin)
    { 
        var rows = d3.select("tbody")
            .selectAll("tr")
            .data(penguin)
            .enter()
            .append("tr")
        
    
        var getPhoto = function(penguin)
            {
                return "imgs/" +penguin.picture
            }
        rows.append("td")
            .append("img")
            .attr("src", getPhoto)
        
        rows.append("td")
            .text(quizMean)
    
         rows.append("td")
            .text(homeworkMean)
            
         rows.append("td")
            .text(testMean)
        
        rows.append("td")
            .text(function(penguin)
                 {
            return penguin.final[0].grade
        })
        
    }

var comparePenguins = function(penguin1, penguin2)
    {
        if(penguin1.final[0].grade>penguin2.final[0].grade)
                {
                    return -1
                }
    else if(penguin1.final[0].grade==penguin2.final[0].grade)
                {
                    return 0
                }
        else 
                {
                    return 1
                }
    }
var sortPenguins = function(penguins)
    {
        d3.select("#final")
            .on("click", function()
{
            penguins.sort(comparePenguins)
            console.log("sorted")
            d3.select("tbody")
            .selectAll("*")
            .remove();
            drawTable(penguins);
            
})
            
    }