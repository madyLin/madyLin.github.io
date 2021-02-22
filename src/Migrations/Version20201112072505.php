<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201112072505 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mssql', 'Migration can only be executed safely on \'mssql\'.');

        $this->addSql('CREATE TABLE rep_log (id INT IDENTITY NOT NULL, user_id INT NOT NULL, reps INT NOT NULL, item NVARCHAR(50) NOT NULL, totalWeightLifted DOUBLE PRECISION NOT NULL, PRIMARY KEY (id))');
        $this->addSql('CREATE INDEX IDX_A460CE79A76ED395 ON rep_log (user_id)');
        $this->addSql('CREATE TABLE tough_user (id INT IDENTITY NOT NULL, username NVARCHAR(180) NOT NULL, username_canonical NVARCHAR(180) NOT NULL, email NVARCHAR(180) NOT NULL, email_canonical NVARCHAR(180) NOT NULL, enabled BIT NOT NULL, salt NVARCHAR(255), password NVARCHAR(255) NOT NULL, last_login DATETIME, confirmation_token NVARCHAR(180), password_requested_at DATETIME, roles VARCHAR(MAX) NOT NULL, first_name NVARCHAR(255) NOT NULL, last_name NVARCHAR(255) NOT NULL, PRIMARY KEY (id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_C760320692FC23A8 ON tough_user (username_canonical) WHERE username_canonical IS NOT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_C7603206A0D96FBF ON tough_user (email_canonical) WHERE email_canonical IS NOT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_C7603206C05FB297 ON tough_user (confirmation_token) WHERE confirmation_token IS NOT NULL');
        $this->addSql('EXEC sp_addextendedproperty N\'MS_Description\', N\'(DC2Type:array)\', N\'SCHEMA\', \'dbo\', N\'TABLE\', \'tough_user\', N\'COLUMN\', roles');
        $this->addSql('ALTER TABLE rep_log ADD CONSTRAINT FK_A460CE79A76ED395 FOREIGN KEY (user_id) REFERENCES tough_user (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mssql', 'Migration can only be executed safely on \'mssql\'.');

        $this->addSql('CREATE SCHEMA db_accessadmin');
        $this->addSql('CREATE SCHEMA db_backupoperator');
        $this->addSql('CREATE SCHEMA db_datareader');
        $this->addSql('CREATE SCHEMA db_datawriter');
        $this->addSql('CREATE SCHEMA db_ddladmin');
        $this->addSql('CREATE SCHEMA db_denydatareader');
        $this->addSql('CREATE SCHEMA db_denydatawriter');
        $this->addSql('CREATE SCHEMA db_owner');
        $this->addSql('CREATE SCHEMA db_securityadmin');
        $this->addSql('CREATE SCHEMA dbo');
        $this->addSql('ALTER TABLE rep_log DROP CONSTRAINT FK_A460CE79A76ED395');
        $this->addSql('DROP TABLE rep_log');
        $this->addSql('DROP TABLE tough_user');
    }
}
