import MockTest from "../models/mockTestModel";
import Question from "../models/questions";
import User from "../models/userModel";

export const createMocktest = async (req, res) => {
  try {
    const { mockTestName, totalQuestions, totalMarks, createdBy } = req.body;
    if (!mockTestName || !totalQuestions || !totalMarks) {
      return res.status(404).json({
        status: "error",
        message: "Check all mandatory fields",
      });
    }

    const user = await User.findById({ _id: createdBy });
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    const newMockTest = await MockTest.create({
      mockTestName,
      totalQuestions,
      totalMarks,
      createdBy: user._id,
    });
    res.status(201).json(newMockTest);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get all mock tests
export const getAllMockTests = async (req, res) => {
  try {
    const mockTests = await MockTest.find().populate("questions");
    res.status(200).json(mockTests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all mock tests
export const getMockTestsByUser = async (req, res) => {
  try {
    const { userId } = req.query;
    const mockTests = await MockTest.find({ createdBy: userId });
    res.status(200).json(mockTests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get all mock tests
export const getSingleMockTest = async (req, res) => {
  try {
    const { mockTestId } = req.query;
    const mockTest = await MockTest.find({ _id: mockTestId }).populate(
      "questions"
    );
    res.status(200).json(mockTest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to delete a mock test
export const deleteMockTest = async (req, res) => {
  try {
    // Extract mock test ID from request parameters
    const { mockTestId } = req.query;

    // Find the mock test by ID and delete it
    const deletedMockTest = await MockTest.findByIdAndDelete({
      _id: mockTestId,
    });

    if (!deletedMockTest) {
      // If mock test with the given ID is not found, return an error response
      return res.status(404).json({
        status: "error",
        message: "Mock test not found",
      });
    }

    // If mock test is successfully deleted, return success response
    res.status(200).json({
      status: "success",
      message: "Mock test deleted successfully",
      deletedMockTest,
    });
  } catch (error) {
    // If an error occurs during deletion, return an error response
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new question
export const createQuestion = async (req, res) => {
  try {
    const { question, options, correctAnswer } = req.body;
    if (!question || !options || !correctAnswer) {
      return res.status(404).json({
        status: "error",
        message: "Check all mandatory fields",
      });
    }
    const newQuestion = await Question.create({
      question,
      options,
      correctAnswer,
    });
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all questions
export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// add questions mocktest
export const addQuestionsToMockTest = async (req, res) => {
  const { mockTestId, questionIds } = req.body;

  try {
    const mockTest = await MockTest.findById({ _id: mockTestId });

    if (!mockTest) {
      return res.status(404).json({
        status: "error",
        message: "Mock test not found",
      });
    }

    // Find questions by IDs
    const questions = await Question.find({ _id: { $in: questionIds } });

    const foundQuestionIds = questions.map((question) =>
      question._id.toString()
    );
    const notFoundQuestionIds = questionIds.filter(
      (questionId) => !foundQuestionIds.includes(questionId)
    );

    if (notFoundQuestionIds.length > 0) {
      return res.status(400).json({
        status: "error",
        message: "One or more questions not found",
        notFoundQuestionIds: notFoundQuestionIds,
      });
    }

    // Add found questions to the mock test
    mockTest.questions = [
      ...mockTest.questions,
      ...questions.map((question) => question._id),
    ];
    await mockTest.save();

    res.status(200).json(mockTest);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const attendMockTest = async (req, res) => {
  try {
    const { userId, mockTestId, selectedAnswers } = req.body;
    const mockTest = await MockTest.findById({ _id: mockTestId }).populate(
      "questions"
    );
    if (!mockTest) {
      return res.status(404).json({ message: "Mock test not found" });
    }

    let totalMarks = 0;
    for (let i = 0; i < mockTest.questions.length; i++) {
      const question = mockTest.questions[i];
      if (selectedAnswers.hasOwnProperty(question._id.toString())) {
        const selectedAnswer = selectedAnswers[question._id.toString()];
        if (selectedAnswer === question.correctAnswer) {
          totalMarks++;
        }
      }
    }

    const percentageScore = (totalMarks / mockTest.totalQuestions) * 100;

    // Update user's mock test results
    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.mockTestResults.push({ mockTestId, marksObtained: totalMarks });
    await user.save();

    res.status(200).json({ totalMarks, percentageScore });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//View result
export const viewMockTestMarks = async (req, res) => {
  try {
    // Get mock test ID from request params
    const { mockTestId } = req.query;

    // Find the mock test by ID
    const mockTest = await MockTest.findById({ _id: mockTestId });

    if (!mockTest) {
      return res.status(404).json({
        status: "error",
        message: "Mock test not found",
      });
    }

    // Find users who have attended the mock test
    const users = await User.find({ "mockTestResults.mockTestId": mockTestId });

    // Extract marks of individuals who attended the mock test
    const marks = users.map((user) => {
      const mockTestResult = user.mockTestResults.find(
        (mt) => mt.mockTestId.toString() === mockTestId
      );
      return {
        userId: user._id,
        username: user.username,
        marksObtained: mockTestResult ? mockTestResult.marksObtained : null,
      };
    });

    res.status(200).json(marks);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
