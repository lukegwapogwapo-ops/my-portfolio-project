public class Basketball {

    int scores[][] = {
        {98, 105, 112},
        {87, 99, 103},
        {110, 95, 108},
        {102, 115, 97}
    };

    void display() {
        System.out.println("Basketball Scores:");

        for (int i = 0; i < scores.length; i++) {
            System.out.print("Team " + (i + 1) + ": ");

            for (int j = 0; j < scores[i].length; j++) {
                System.out.print(scores[i][j] + " ");
            }

            System.out.println();
        }
    }
}