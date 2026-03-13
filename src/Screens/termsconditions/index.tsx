import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Screen, Text } from "../../Components";
import { AppStackScreenProps } from "../../utils/interfaces";
import { spacing, colors } from "../../theme";
import { Ionicons } from "@expo/vector-icons";

interface TermsConditionsProps extends AppStackScreenProps<"TermsConditions"> {}

export function TermsConditions(props: TermsConditionsProps) {
  const { navigation } = props;
  const today = new Date();
  const effectiveDate = today.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Each section: title + body (array paragraphs) OR bullets
  const sections: {
    title: string;
    body?: string[];
    bullets?: string[];
  }[] = [
    {
      title: "1. Acceptance of Terms",
      body: [
        "These Terms & Conditions (the 'Terms') govern your access to and use of the FiveTips mobile application, website, services, content, features, and subscriptions (collectively, the 'Service'). By creating an account, accessing, or using the Service you confirm that you have read, understood, and agree to be bound by these Terms.",
        "If you do not agree, you must discontinue use immediately. If you use the Service on behalf of an organization, you represent that you have authority to bind that organization to these Terms.",
      ],
    },
    {
      title: "2. Nature of Information – No Financial Advice",
      bullets: [
        "All content (including AI-generated insights, tips, signals, analytics, charts, confidence scores, and educational material) is provided strictly for general informational and educational purposes.",
        "FiveTips is NOT a broker, fiduciary, financial planner, investment advisor, portfolio manager, or tax advisor.",
        "Nothing in the Service constitutes an offer, solicitation, recommendation, endorsement, or advice to buy, sell, or hold any security, cryptocurrency, commodity, or other financial instrument.",
        "You are solely responsible for any investment decisions you make. Always perform your own due diligence or consult a licensed professional.",
      ],
      body: [
        "By using the Service you acknowledge and agree that you assume all risk for any investment decisions and outcomes.",
      ],
    },
    {
      title: "3. Eligibility",
      body: [
        "You must be at least 18 years old (or the age of majority in your jurisdiction) to use the Service. You warrant that the registration information you provide is accurate, complete, and kept current. We may suspend or terminate access if we believe information is inaccurate or these Terms are violated.",
      ],
    },
    {
      title: "4. Account & Security",
      bullets: [
        "You are responsible for safeguarding your login credentials.",
        "Immediately notify us of any unauthorized access or suspected breach.",
        "We are not liable for losses arising from compromised credentials unless caused directly by our negligence.",
      ],
    },
    {
      title: "5. Subscription, Trials & Billing",
      body: [
        "Certain features require an active paid subscription. Trial periods (if offered) permit limited-time access; after expiration, billing continues automatically unless canceled at least 24 hours before renewal.",
        "Prices, features, and plan structures may change with prior notice where required. Taxes and processing fees may apply.",
        "Refunds (if any) follow the relevant app store (Apple App Store / Google Play) policies. We do not process refunds for purchases made through third‑party platforms.",
      ],
    },
    {
      title: "6. AI & Data Limitations",
      bullets: [
        "Outputs may be probabilistic, incomplete, outdated, or inconsistent.",
        "Data sources may include third‑party feeds; accuracy, latency, or continuity is not guaranteed.",
        "Confidence scores are heuristic and NOT predictive guarantees.",
      ],
      body: [
        "You agree not to rely solely on any single metric or AI output when making financial decisions.",
      ],
    },
    {
      title: "7. User Conduct",
      bullets: [
        "Do not scrape, reverse engineer, or exploit the Service.",
        "Do not upload malicious code, attempt unauthorized access, or interfere with infrastructure.",
        "Do not use content to build or train competing models/services without written consent.",
        "Do not misuse branding, trademarks, or intellectual property.",
      ],
    },
    {
      title: "8. Intellectual Property",
      body: [
        "All trademarks, logos, service marks, graphs, UI components, generated analytics, and proprietary algorithms are owned or licensed by FiveTips and protected by applicable intellectual property laws.",
        "You are granted a limited, non‑exclusive, non‑transferable, revocable license to access and use the Service for personal, non‑commercial purposes only.",
      ],
    },
    {
      title: "9. Third‑Party Links & Services",
      body: [
        "The Service may reference third‑party content, APIs, or integrations. We do not endorse nor assume responsibility for third‑party sites, data accuracy, availability, or security. Use of third‑party resources is at your own risk.",
      ],
    },
    {
      title: "10. Risk Disclosure",
      bullets: [
        "Investing involves risk including possible loss of principal.",
        "Market conditions can change rapidly and unpredictably.",
        "Past performance, back‑tests, simulations, or confidence scores do NOT guarantee future results.",
      ],
      body: [
        "You should carefully consider your financial situation, risk tolerance, and consult licensed advisors before acting on any information from the Service.",
      ],
    },
    {
      title: "11. Privacy & Data",
      body: [
        "Use of the Service is also governed by our Privacy Policy (available in‑app). By using the Service you consent to data processing as described therein, including aggregation or anonymization for analytics and model improvement.",
      ],
    },
    {
      title: "12. Suspension & Termination",
      body: [
        "We may suspend or terminate access (with or without notice) for violations of these Terms, suspected fraud, legal compliance, or security concerns. Upon termination your right to use the Service ceases immediately; sections that by nature should survive (e.g., IP, disclaimers, limitation of liability) will remain in effect.",
      ],
    },
    {
      title: "13. Disclaimer of Warranties",
      body: [
        "THE SERVICE IS PROVIDED 'AS IS' AND 'AS AVAILABLE' WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ACCURACY, COMPLETENESS, RELIABILITY, NON‑INFRINGEMENT, MERCHANTABILITY, OR FITNESS FOR A PARTICULAR PURPOSE. YOUR USE IS AT YOUR SOLE RISK.",
      ],
    },
    {
      title: "14. Limitation of Liability",
      body: [
        "TO THE MAXIMUM EXTENT PERMITTED BY LAW, FIVE TIPS (AND ITS AFFILIATES, OFFICERS, EMPLOYEES, LICENSORS, PARTNERS) SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES; NOR ANY LOSS OF PROFITS, DATA, GOODWILL, OR OTHER INTANGIBLE LOSSES ARISING FROM OR RELATED TO YOUR USE OR INABILITY TO USE THE SERVICE, EVEN IF ADVISED OF THE POSSIBILITY.",
        "IN NO EVENT WILL OUR TOTAL AGGREGATE LIABILITY EXCEED (A) THE AMOUNT PAID BY YOU IN THE THREE (3) MONTHS PRECEDING THE CLAIM OR (B) FIFTY U.S. DOLLARS (USD $50), WHICHEVER IS GREATER.",
      ],
    },
    {
      title: "15. Indemnification",
      body: [
        "You agree to defend, indemnify, and hold harmless FiveTips and its affiliates from any claims, damages, liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of or related to: (a) your use of the Service; (b) violation of these Terms; or (c) infringement of any third‑party rights.",
      ],
    },
    {
      title: "16. Changes to the Service & Terms",
      body: [
        "We may modify or discontinue features at any time. We may update these Terms; material changes will be communicated via in‑app notice or email (where feasible). Continued use after changes constitutes acceptance of the revised Terms.",
      ],
    },
    {
      title: "17. Governing Law & Dispute Resolution",
      body: [
        "These Terms shall be governed by and construed in accordance with the laws of your primary operating jurisdiction (unless overridden by mandatory local law). Any disputes shall first attempt informal resolution; if unresolved, they may be submitted to binding arbitration or courts of competent jurisdiction as determined by our governing policy. Local consumer protection laws may still apply.",
      ],
    },
    {
      title: "18. Severability",
      body: [
        "If any provision of these Terms is held invalid or unenforceable, the remaining provisions shall remain in full force and effect.",
      ],
    },
    {
      title: "19. No Waiver",
      body: [
        "Failure to enforce any right or provision will not constitute a waiver of that right or provision.",
      ],
    },
    {
      title: "20. Contact",
      body: [
        "Questions about these Terms may be directed via the Contact Support section in the app.",
      ],
    },
    {
      title: "21. Acknowledgements",
      bullets: [
        "This is not financial advice.",
        "Past performance does not guarantee future results.",
        "You understand and accept investment risks.",
        "You are solely responsible for your decisions.",
      ],
    },
    {
      title: "Effective Date",
      body: [`These Terms are effective as of ${effectiveDate}.`],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#1A1E44" />
        </TouchableOpacity>
        <Text
          weight="bold"
          text="Terms and conditions"
          style={styles.headerTitle}
        />
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Brand Name */}
        <Text weight="bold" text="MyHomes" style={styles.brandName} />

        {/* Content */}
        <Text
          weight="regular"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
          style={styles.contentText}
        />

        <Text
          weight="regular"
          text="Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
          style={styles.contentText}
        />

        <Text
          weight="regular"
          text="Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."
          style={styles.contentText}
        />

        <Text
          weight="regular"
          text="Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
          style={styles.contentText}
        />

        {/* Original Terms Content */}
        <View style={styles.originalContent}>
          <Text
            weight="light"
            style={styles._footer}
            text="Note: These terms are effective as of today. By using MyHomes, you agree to these terms and conditions."
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    color: "#1A1E44",
    fontWeight: "600",
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  brandName: {
    fontSize: 28,
    color: "#1A1E44",
    marginBottom: 24,
    fontWeight: "700",
  },
  contentText: {
    fontSize: 15,
    color: "#666",
    lineHeight: 24,
    marginBottom: 16,
  },
  originalContent: {
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  _footer: {
    fontSize: 13,
    lineHeight: 20,
    color: "#999",
    textAlign: "center",
  },
});
